import { Request, Response } from 'express';
import Customer from '../models/customerModel';

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();
        res.status(201).json({
            success: true,
            data: savedCustomer,
            message: 'Customer created successfully'
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error creating customer',
            error: error.message
        });
    }
};

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            success: true,
            data: customers,
            count: customers.length
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching customers',
            error: error.message
        });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }
        res.status(200).json({
            success: true,
            data: customer
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching customer',
            error: error.message
        });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }
        res.status(200).json({
            success: true,
            data: customer,
            message: 'Customer updated successfully'
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error updating customer',
            error: error.message
        });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error deleting customer',
            error: error.message
        });
    }
};
