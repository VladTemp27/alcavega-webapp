import { Request, Response } from 'express';
import User from '../models/userModel';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json({
            success: true,
            data: savedUser,
            message: 'User created successfully'
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate('crops');
        res.status(200).json({
            success: true,
            data: users,
            count: users.length
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).populate('crops');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        });
    }
};

export const getUserByClerkId = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ clerkId: req.params.clerkId }).populate('crops');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user by Clerk ID',
            error: error.message
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('crops');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: user,
            message: 'User updated successfully'
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

export const updateUserByClerkId = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { clerkId: req.params.clerkId },
            req.body,
            { new: true, runValidators: true }
        ).populate('crops');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: user,
            message: 'User updated successfully'
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};

export const addCropToUser = async (req: Request, res: Response) => {
    try {
        const { cropId } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { crops: cropId } },
            { new: true, runValidators: true }
        ).populate('crops');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: user,
            message: 'Crop added to user successfully'
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error adding crop to user',
            error: error.message
        });
    }
};

export const removeCropFromUser = async (req: Request, res: Response) => {
    try {
        const { cropId } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { crops: cropId } },
            { new: true, runValidators: true }
        ).populate('crops');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: user,
            message: 'Crop removed from user successfully'
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error removing crop from user',
            error: error.message
        });
    }
};
