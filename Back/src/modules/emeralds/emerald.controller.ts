import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Emerald } from './emerald.model.js';
import { storageService } from '../../shared/services/storage.service.js';
import { slugify } from '../../shared/utils/slugify.js';

/**
 * 🐍 EMERALD CONTROL CENTER - INDUSTRIAL GRADE (L6)
 * Protocolo Constrictor: Software DT Standard | Gestión de Activos y Telemetría
 */

// 1. REGISTRO DE NUEVOS ACTIVOS (CREATE)
export const createEmerald = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const uploadedFiles: string[] = [];
    
    try {
        const { body, files } = req;
        const fileArray = files as { [fieldname: string]: Express.Multer.File[] };

        // A. Persistencia de Archivos en Storage (Pre-DB)
        if (fileArray?.['images']) {
            for (const file of fileArray['images']) {
                const result = await storageService.uploadAsset(file, 'emeralds');
                uploadedFiles.push(result.url);
            }
        }

        let certUrl = '';
        if (fileArray?.['certificateFile']?.[0]) {
            const certRes = await storageService.uploadAsset(fileArray['certificateFile'][0], 'certificates');
            certUrl = certRes.url;
            uploadedFiles.push(certRes.url); // Registro para rollback en caso de fallo
        }

        // B. Estructuración L6 con Sincronización de Slugs y Estados
        const emeraldData = {
            ...body,
            slug: slugify(body.name),
            assets: {
                images: uploadedFiles.filter(url => url.includes('/emeralds/')),
                certificate: {
                    ...body.assets?.certificate,
                    pdfUrl: certUrl || body.assets?.certificate?.pdfUrl
                }
            },
            inventory: {
                ...body.inventory,
                lastStockUpdate: new Date() // Forzamos timestamp de auditoría
            }
        };

        const newEmerald = new Emerald(emeraldData);
        await newEmerald.save({ session });

        await session.commitTransaction();
        
        return res.status(201).json({
            status: 'SUCCESS',
            node: 'ALPHA_CLUSTER',
            data: newEmerald
        });

    } catch (error: any) {
        await session.abortTransaction();
        
        // 🛡️ RECOVERY PROTOCOL: Limpieza inmediata de storage para evitar archivos huérfanos
        if (uploadedFiles.length > 0) {
            await Promise.all(uploadedFiles.map(url => storageService.deleteAsset(url)));
        }

        return res.status(500).json({
            status: 'CRITICAL_FAILURE',
            origin: 'CONSTRICTOR_PIPELINE',
            details: error.message
        });
    } finally {
        session.endSession();
    }
};

// 2. CONSULTA OPTIMIZADA CON FILTROS (READ ALL)
export const getAllEmeralds = async (req: Request, res: Response) => {
    try {
        const { origin, status, minPrice, maxPrice, limit = 20, page = 1 } = req.query;
        const query: any = {};

        // Filtros semánticos para el Catálogo y consultas analíticas
        if (origin) query['specifications.origin'] = origin;
        if (status) query['inventory.status'] = status; // 💎 Filtro nativo por AVAILABLE, SOLD o RESERVED
        
        if (minPrice || maxPrice) {
            query['financials.price'] = { 
                ...(minPrice && { $gte: Number(minPrice) }),
                ...(maxPrice && { $lte: Number(maxPrice) }) 
            };
        }

        const emeralds = await Emerald.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .sort({ createdAt: -1 })
            .lean(); // Performance S+: Desactiva la hidratación pesada de Mongoose

        const total = await Emerald.countDocuments(query);

        return res.status(200).json({
            status: 'SUCCESS',
            meta: { 
                total, 
                page: Number(page), 
                pages: Math.ceil(total / Number(limit)) 
            },
            data: emeralds
        });
    } catch (error: any) {
        return res.status(500).json({ status: 'FETCH_ERROR', details: error.message });
    }
};

// 3. CONSULTA POR SLUG (SEO & VIEWPORT COMPONENT READY)
export const getEmeraldBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const emerald = await Emerald.findOne({ slug }).lean();

        if (!emerald) return res.status(404).json({ status: 'NOT_FOUND' });

        return res.status(200).json({ status: 'SUCCESS', data: emerald });
    } catch (error: any) {
        return res.status(500).json({ status: 'FETCH_ERROR', details: error.message });
    }
};

// 4. ACTUALIZACIÓN DINÁMICA (PATCH/PUT)
export const updateEmerald = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Si el Dashboard muta el nombre, recalculamos el slug de inmediato
        if (updateData.name) {
            updateData.slug = slugify(updateData.name);
        }

        const updated = await Emerald.findByIdAndUpdate(
            id,
            { 
                $set: { ...updateData, 'inventory.lastStockUpdate': new Date() },
                $inc: { __v: 1 } // Seguimiento de versiones del documento para auditoría
            },
            { new: true, runValidators: true }
        ).lean();

        if (!updated) return res.status(404).json({ status: 'NOT_FOUND' });

        return res.status(200).json({ status: 'SUCCESS', data: updated });
    } catch (error: any) {
        return res.status(500).json({ status: 'UPDATE_ERROR', details: error.message });
    }
};

// 5. ELIMINACIÓN CON PURGA ABSOLUTA (DELETE)
export const deleteEmerald = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const emerald = await Emerald.findById(id);

        if (!emerald) return res.status(404).json({ status: 'NOT_FOUND' });

        // Protocolo de Purga: Identificación de binarios para destrucción física
        const images = emerald.assets?.images || [];
        const cert = emerald.assets?.certificate?.pdfUrl;
        const assetsToPurge = [...images];
        if (cert) assetsToPurge.push(cert);

        if (assetsToPurge.length > 0) {
            await Promise.all(assetsToPurge.map(url => storageService.deleteAsset(url)));
        }

        await Emerald.findByIdAndDelete(id);

        return res.status(200).json({ 
            status: 'SUCCESS', 
            message: 'Asset and Files Permanently Purged from Ecosystem' 
        });
    } catch (error: any) {
        return res.status(500).json({ status: 'DELETE_ERROR', details: error.message });
    }
};

// 6. 📊 MOTOR DE AGREGACIÓN DE INVENTARIO (TELEMETRY)
// Alimenta los contadores estáticos de esmeraldas (Disponibles, Vendidas, Reservadas)
export const getInventoryMetrics = async (req: Request, res: Response) => {
    try {
        const metrics = await Emerald.aggregate([
            {
                $group: {
                    _id: '$inventory.status', // Agrupación directa sobre las constantes de estado
                    count: { $sum: 1 },
                    totalValue: { $sum: '$financials.price' } // Sumatoria de capital financiero en esa fase
                }
            }
        ]);

        // Mapeo inicializado en cero para proteger los componentes del Front-end contra nulos
        const formattedMetrics = {
            AVAILABLE: { count: 0, capital: 0 },
            SOLD: { count: 0, capital: 0 },
            RESERVED: { count: 0, capital: 0 }
        };

        metrics.forEach(item => {
            if (item._id in formattedMetrics) {
                formattedMetrics[item._id as keyof typeof formattedMetrics] = {
                    count: item.count,
                    capital: item.totalValue
                };
            }
        });

        return res.status(200).json({
            status: 'SUCCESS',
            origin: 'ALPHA_METRICS_ENGINE',
            data: formattedMetrics
        });
    } catch (error: any) {
        return res.status(500).json({ status: 'METRICS_ERROR', details: error.message });
    }
};