import { Request, Response } from 'express';
import Supplier from '../models/supplierModel';

export const createSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = new Supplier(req.body);
        const savedSupplier = await supplier.save();
        res.status(201).json({
            success: true,
            data: savedSupplier,
            message: 'Supplier created successfully'
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error creating supplier',
            error: error.message
        });
    }
};

export const getAllSuppliers = async (req: Request, res: Response) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json({
            success: true,
            data: suppliers,
            count: suppliers.length
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching suppliers',
            error: error.message
        });
    }
};

export const getSupplierById = async (req: Request, res: Response) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found'
            });
        }
        res.status(200).json({
            success: true,
            data: supplier
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching supplier',
            error: error.message
        });
    }
};

export const updateSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found'
            });
        }
        res.status(200).json({
            success: true,
            data: supplier,
            message: 'Supplier updated successfully'
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error updating supplier',
            error: error.message
        });
    }
};

export const deleteSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Supplier deleted successfully'
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error deleting supplier',
            error: error.message
        });
    }
};

export const getSuppliersByCrop = async (req: Request, res: Response) => {
    try {
        const { crop } = req.params;
        const suppliers = await Supplier.find({ 
            crops: { $in: [crop] } 
        });
        
        res.status(200).json({
            success: true,
            data: suppliers,
            count: suppliers.length
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching suppliers by crop',
            error: error.message
        });
    }
};
