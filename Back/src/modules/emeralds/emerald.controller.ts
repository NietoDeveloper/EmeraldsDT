import { Request, Response } from 'express';
import { Emerald } from './emerald.model.js';
import { storageService } from '../../shared/services/storage.service.js';
import mongoose from 'mongoose';

/**
 * 🐍 EMERALD CONTROL CENTER - NIVEL L6 (INDUSTRIAL GRADE)
 * Protocolo Constrictor: Isabella Nieto | Software DT
 */

// 1. REGISTRO DE NUEVOS ACTIVOS (CREATE)
export const createEmerald = async (req: Request, res: Response) => {
    // Iniciamos sesión para transaccionalidad (Si el cluster soporta replica sets)
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
            uploadedFiles.push(certRes.url); // Track para limpieza en caso de error
        }

        // B. Estructuración de Data L6
        const emeraldData = {
            ...body,
            slug: body.name ? body.name.toLowerCase().split(' ').join('-') : undefined,
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
        // 🛡️ RECOVERY PROTOCOL: Si la DB falla, borramos los archivos recién subidos
        for (const url of uploadedFiles) {
            await storageService.deleteAsset(url);
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
            .lean(); // Nivel L6: .lean() para mayor velocidad de lectura

        const total = await Emerald.countDocuments(query);

        res.status(200).json({
            status: 'SUCCESS',
            meta: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
            data: emeralds
        });
    } catch (error: any) {
        res.status(500).json({ status: 'FETCH_ERROR', details: error.message });
    }
};

// 3. ACTUALIZACIÓN DE INVENTARIO EN TIEMPO REAL (PATCH/UPDATE)
export const updateEmerald = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // Nivel L6: Usamos findByIdAndUpdate con proyecciones para evitar tráfico innecesario
        const updated = await Emerald.findByIdAndUpdate(
            id,
            { 
                $set: { ...req.body, 'inventory.lastStockUpdate': new Date() },
                $inc: { __v: 1 } // Tracking de versiones de documento
            },
            { new: true, runValidators: true }
        ).lean();

        if (!updated) return res.status(404).json({ status: 'NOT_FOUND' });

t emerald = await Emerald.findById(id);

        if (!emerald) return res.status(404).json({ status: 'NOT_FOUND' });

        // Protocolo Constrictor: Limpieza física antes de la lógica
        const assetsToPurge = [...(emerald.assets.images || [])];

};