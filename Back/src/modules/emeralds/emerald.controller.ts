import { Request, Response } from 'express';
import { Emerald } from './emerald.model.js';
import { storageService } from '../../shared/services/storage.service.js';

/**
 * 🐍 EMERALD CONTROL CENTER - NIVEL S+
 * Operado bajo el protocolo de La Constrictor: Isabella Nieto
 */

// 1. REGISTRO DE NUEVOS ACTIVOS (CREATE)
export const createEmerald = async (req: Request, res: Response) => {
    try {
        const { body, files } = req;
        const uploadedImages: string[] = [];
        let certificateUrl = '';

        // Procesamiento de Activos en el nido de La Constrictor
        if (files && typeof files === 'object') {
            const fileArray = files as { [fieldname: string]: Express.Multer.File[] };

            // Subida masiva de imágenes de la esmeralda
            if (fileArray['images']) {
                const imagePromises = fileArray['images'].map(file => 
                    storageService.uploadAsset(file, 'emeralds')
                );
                const results = await Promise.all(imagePromises);
                results.forEach(res => uploadedImages.push(res.url));
            }

            // Subida de Certificado (GIA/CDTEC)
            if (fileArray['certificateFile'] && fileArray['certificateFile'][0]) {
                const certRes = await storageService.uploadAsset(fileArray['certificateFile'][0], 'certificates');
                certificateUrl = certRes.url;
            }
        }

        // Construcción del objeto final para Atlas
        const emeraldData = {
            ...body,
            assets: {
                images: uploadedImages,
                certificate: {
                    ...body.assets?.certificate,
                    pdfUrl: certificateUrl || body.assets?.certificate?.pdfUrl
                }
            },
            audit: {
                createdBy: req.body.adminId // Se conectará con el JWT después
            }
        };

        const newEmerald = new Emerald(emeraldData);
        await newEmerald.save();

        res.status(201).json({
            status: 'SUCCESS',
            message: 'Asset secured in Cluster Alpha',
            data: newEmerald
        });

    } catch (error: any) {
        res.status(500).json({
            status: 'CRITICAL_ERROR',
            message: 'La Constrictor detected a failure in the creation pipeline',
            details: error.message
        });
    }
};

// 2. CONSULTA DE INVENTARIO COMPLETO (READ ALL)
export const getAllEmeralds = async (req: Request, res: Response) => {
    try {
        const { origin, minWeight, maxWeight, status } = req.query;
        let query: any = {};

        // Filtros de Ingeniería para el Dashboard
        if (origin) query['specifications.origin'] = origin;
        if (status) query['inventory.status'] = status;
        if (minWeight || maxWeight) {
            query['specifications.weight'] = { 
                ...(minWeight && { $gte: Number(minWeight) }),
                ...(maxWeight && { $lte: Number(maxWeight) }) 
            };
        }

        const emeralds = await Emerald.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            status: 'SUCCESS',
            count: emeralds.length,
            data: emeralds
        });
    } catch (error: any) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

// 3. CONSULTA DETALLADA POR SLUG (READ ONE)
export const getEmeraldBySlug = async (req: Request, res: Response) => {

};


// 5. ELIMINACIÓN ATÓMICA (DELETE)
export const deleteEmerald = async (req: Request, res: Response) => {
    try {

};