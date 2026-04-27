import { Request, Response, NextFunction } from 'express';

/**
 * 🛰️ LA CONSTRICTOR - PROTOCOLO DE INTEGRIDAD S+
 * Motor de asfixia de datos malformados. Asegura que solo activos 
 * de grado de inversión toquen los clusters Alpha y Omega.
 */
export const validateEmeraldData = (req: Request, res: Response, next: NextFunction) => {
    const { sku, name, specifications, financials, inventory } = req.body;

    // 1. ESCUDO DE IDENTIDAD (SKU & NAMING)
    if (!sku || typeof sku !== 'string' || sku.length < 5) {
        return res.status(422).json({
            status: 'REJECTED',
            origin: 'La Constrictor / Identity_Shield',
            reason: 'Invalid SKU: Identification string must be at least 5 characters.',
            timestamp: new Date().toISOString()
        });
    }

    if (!name || name.trim().length < 3) {
        return res.status(422).json({
            status: 'REJECTED',
            origin: 'La Constrictor / Identity_Shield',
            reason: 'Invalid Name: Essential for SEO and Catalog indexing.',
            timestamp: new Date().toISOString()
        });
    }

    // 2. RIGIDEZ TÉCNICA (SPECIFICATIONS)
    const { weight, dimensions, clarity, origin } = specifications || {};
    
    if (!weight || weight <= 0) {
        return res.status(422).json({
            status: 'REJECTED',
            origin: 'La Constrictor / Technical_Validator',
            reason: 'Metric Failure: Carat weight must be a positive non-zero value.',
        });
    }

    if (!dimensions || !dimensions.length || !dimensions.width || !dimensions.depth) {
        return res.status(422).json({
            status: 'REJECTED',
            origin: 'La Constrictor / Technical_Validator',
            reason: 'Dimensional Failure: All axes (L, W, D) are required for 3D Digital Twin.',
        });
    }

    const validClarity = ['F', 'VVS', 'VS', 'SI', 'I'];
    if (!validClarity.includes(clarity)) {
        return res.status(422).json({
            status: 'REJECTED',
            origin: 'La Constrictor / Technical_Validator',
            reason: `Standard Failure: Clarity must be one of [${validClarity.join(', ')}].`,
        });
    }

    // 3. INTEGRIDAD FINANCIERA (MONEY FLOW)
    if (!financials || typeof financials.price !== 'number' || financials.price < 0) {
        return res.status(422).json({
            status: 'REJECTED',
            origin: 'La Constrictor / Financial_Shield',
            reason: 'Economic Failure: Asset valuation must be a valid numeric amount.',
        });
    }

    // 4. PROTOCOLO DE SANITIZACIÓN S+
    // Transformamos los datos para que el Cluster Alpha reciba información pura
    req.body.sku = sku.toUpperCase().trim();
    req.body.name = name.trim();
    if (req.body.specifications.origin) {
        req.body.specifications.origin = req.body.specifications.origin.charAt(0).toUpperCase() + 
                                         req.body.specifications.origin.slice(1).toLowerCase();
    }

    // Inyección de metadata de seguridad para el controlador
    req.body.metadata = {
        ...req.body.metadata,
        validatedBy: 'La Constrictor v1.0',
        integrityCheck: 'PASSED'
    };

    next(); // Acceso concedido al controlador de Emerald DT
};

/**
 * 🛡️ CONTROL DE INVENTARIO (Inventory Check)
 * Asegura la coherencia entre lo solicitado y lo existente en el Datacenter.
 */
export const checkStockAvailability = (req: Request, res: Response, next: NextFunction) => {
    const { inventory } = req.body;

    if (inventory && inventory.stock < 0) {
        return res.status(422).json({
            status: 'REJECTED',
            origin: 'La Constrictor / Inventory_Guard',
            reason: 'Logistical Failure: Stock levels cannot be negative.',
        });
    }

    next();
};