import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Emerald } from './emerald.model.js';
import { storageService } from '../../shared/services/storage.service.js';
import { slugify } from '../../shared/utils/slugify.js';

/**
 * 🐍 EMERALD CONTROL CENTER - INDUSTRIAL GRADE (L6)
 * Protocolo Constrictor: Software DT Standard
 */

// 1. REGISTRO DE NUEVOS ACTIVOS (CREATE)
export const createEmerald = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const uploadedFiles: string[] = [];
    
    try {
        const { body, files } = req;
        const fileArray = files as { [fieldname: string]: Express.Multer.File[] };

        // A. Persistencia de Archivos (Pre-DB)
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
            uploadedFiles.push(certRes.url);
        }

        // B. Estructuración L6 con Slugify y Sanitización
        const emeraldData = {
            ...body,
            // Priorizamos el slug generado por la utilidad L6
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
                lastStockUpdate: new Date()
            }
        };

        const newEmerald = new Emerald(emeraldData);
        await newEmerald.save({ session });

        await session.commitTransaction();
        
        res.status(201).json({
            status: 'SUCCESS',
            node: 'ALPHA_CLUSTER',
            data: newEmerald
        });

    } catch (error: any) {
        await session.abortTransaction();
        
        // 🛡️ RECOVERY PROTOCOL: Limpieza de archivos huérfanos en caso de error de DB
        if (uploadedFiles.length > 0) {
            await Promise.all(uploadedFiles.map(url => storageService.deleteAsset(url)));
        }

        res.status(500).json({
            status: 'CRITICAL_FAILURE',
            origin: 'CONSTRICTOR_PIPELINE',
            details: error.message
        });
    } finally {
        session.endSession();
    }
};

// 2. CONSULTA OPTIMIZADA (READ ALL)
export const getAllEmeralds = async (req: Request, res: Response) => {
    try {
        const { origin, status, minPrice, maxPrice, limit = 20, page = 1 } = req.query;
        const query: any = {};

        // Filtros Semánticos
        if (origin) query['specifications.origin'] = origin;
        if (status) query['inventory.status'] = status;
        
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
            .lean(); // Performance: No instanciar documentos Mongoose

        const total = await Emerald.countDocuments(query);

        res.status(200).json({
            status: 'SUCCESS',
            meta: { 
                total, 
                page: Number(page), 
                pages: Math.ceil(total / Number(limit)) 
            },
            data: emeralds
        });
    } catch (error: any) {
        res.status(500).json({ status: 'FETCH_ERROR', details: error.message });
    }
};

// 3. CONSULTA POR SLUG (SEO READY)
export const getEmeraldBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const emerald = await Emerald.findOne({ slug }).lean();

        if (!emerald) return res.status(404).json({ status: 'NOT_FOUND' });

        res.status(200).json({ status: 'SUCCESS', data: emerald });
    } catch (error: any) {
        res.status(500).json({ status: 'FETCH_ERROR', details: error.message });
    }
};

// 4. ACTUALIZACIÓN (PATCH)
export const updateEmerald = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Si se cambia el nombre, se debe regenerar el slug
        if (updateData.name) {
            updateData.slug = slugify(updateData.name);
        }

        const updated = await Emerald.findByIdAndUpdate(
            id,
            { 
                $set: { ...updateData, 'inventory.lastStockUpdate': new Date() },
                $inc: { __v: 1 } 
            },
            { new: true, runValidators: true }
        ).lean();

        if (!updated) return res.status(404).json({ status: 'NOT_FOUND' });

        res.status(200).json({ status: 'SUCCESS', data: updated });
    } catch (error: any) {
        res.status(500).json({ status: 'UPDATE_ERROR', details: error.message });
    }
};

// 5. ELIMINACIÓN CON PURGA DE ACTIVOS
export const deleteEmerald = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const emerald = await Emerald.findById(id);

        if (!emerald) return res.status(404).json({ status: 'NOT_FOUND' });

        // Protocolo de Purga: No dejar basura en el storage
        const images = emerald.assets?.images || [];
        const cert = emerald.assets?.certificate?.pdfUrl;
        const assetsToPurge = [...images];
        if (cert) assetsToPurge.push(cert);

        if (assetsToPurge.length > 0) {
            await Promise.all(assetsToPurge.map(url => storageService.deleteAsset(url)));
        }

        await Emerald.findByIdAndDelete(id);

        res.status(200).json({ 
            status: 'SUCCESS', 
            message: 'Asset and Files Permanently Purged' 
        });
    } catch (error: any) {
        res.status(500).json({ status: 'DELETE_ERROR', details: error.message });
    }
};