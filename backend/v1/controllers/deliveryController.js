import Delivery from '../models/deliveryModel.js';

export const createDelivery = async (req, res) => {
    try {
        const delivery = new Delivery(req.body);
        const savedDelivery = await delivery.save();
        
        // Populate references for response
        const populatedDelivery = await Delivery.findById(savedDelivery._id)
            .populate('from', 'name email')
            .populate('to', 'name address phone')
            .populate('crops.supplier', 'name phone');
            
        res.status(201).json({
            success: true,
            data: populatedDelivery,
            message: 'Delivery created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating delivery',
            error: error.message
        });
    }
};

export const getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find()
            .populate('from', 'name email')
            .populate('to', 'name address phone')
            .populate('crops.supplier', 'name phone')
            .sort({ date: -1 });
            
        res.status(200).json({
            success: true,
            data: deliveries,
            count: deliveries.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching deliveries',
            error: error.message
        });
    }
};

export const getDeliveryById = async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id)
            .populate('from', 'name email')
            .populate('to', 'name address phone')
            .populate('crops.supplier', 'name phone');
            
        if (!delivery) {
            return res.status(404).json({
                success: false,
                message: 'Delivery not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: delivery
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching delivery',
            error: error.message
        });
    }
};

export const updateDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        .populate('from', 'name email')
        .populate('to', 'name address phone')
        .populate('crops.supplier', 'name phone');
        
        if (!delivery) {
            return res.status(404).json({
                success: false,
                message: 'Delivery not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: delivery,
            message: 'Delivery updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating delivery',
            error: error.message
        });
    }
};

export const deleteDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.findByIdAndDelete(req.params.id);
        if (!delivery) {
            return res.status(404).json({
                success: false,
                message: 'Delivery not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Delivery deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting delivery',
            error: error.message
        });
    }
};

export const updateDeliveryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'in-transit', 'unloading', 'completed'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }
        
        const delivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!delivery) {
            return res.status(404).json({
                success: false,
                message: 'Delivery not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: delivery,
            message: 'Delivery status updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating delivery status',
            error: error.message
        });
    }
};

export const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        const validStatuses = ['paid', 'unpaid'];
        
        if (!validStatuses.includes(paymentStatus)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment status value'
            });
        }
        
        const delivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            { paymentStatus },
            { new: true, runValidators: true }
        );
        
        if (!delivery) {
            return res.status(404).json({
                success: false,
                message: 'Delivery not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: delivery,
            message: 'Payment status updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating payment status',
            error: error.message
        });
    }
};

export const getDeliveriesByUser = async (req, res) => {
    try {
        const deliveries = await Delivery.find({ from: req.params.userId })
            .populate('to', 'name address phone')
            .populate('crops.supplier', 'name phone')
            .sort({ date: -1 });
            
        res.status(200).json({
            success: true,
            data: deliveries,
            count: deliveries.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user deliveries',
            error: error.message
        });
    }
};

export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
};
