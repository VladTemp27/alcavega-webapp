import User from '../models/users.model.js';

class UserController{

    static async getUser(req,res){
        var currentUsername =  req.params.username;
        try{
            const user = await User.findOne({username: currentUsername});
            res.status(200).json(user);
        }catch(error){
            res.status(404).json({error: 'User not found'});
        }    
    }
    
    //TODO: create a function that will check further who is editing who,
    // if the user is an admin, then they can edit any user, if not, they can only edit themselves
    static async updateUser(req,res){
        var currentUsername =  req.params.username;
        var user = null
        try{
            user = await User.findOne({username: currentUsername});
        }catch(error){
            res.status(404).json({error: 'User not found'});
        }
        const {username, password, isAdmin, farmer_data} = req.body;
        
        const newUser = UserController.createUserModel(username, password, isAdmin, farmer_data);
        try{
            res.status(200).json(await newUser.save());
        }catch(error){
            res.status(400).json({error: error});
        }
    }

    static async createUser(req,res){
        const {username, password, isAdmin, farmer_data} = req.body;
        const newUser = await UserController.createUserModel(username, password, isAdmin, farmer_data);
        try{
            if(await(User.findOne({username: newUser.username}))){
                res.status(400).json({error: 'Username already exists'});
                return
            }
            const user = await newUser.save();
            res.status(201).json(user);
        } catch(error){
            res.status(400).json({error: error});
        }
    }


    //TODO: create a function that will hash the password
    static async createUserModel(username, password, isAdmin, farmer_data){
        if(!username && farmer_data){
            username = farmer_data.phone_number;
            password = "password123"
            return new User({username: username, password: password, isAdmin: isAdmin, farmer_data: farmer_data});
        }
        return new User({username: username, password: password, isAdmin: isAdmin});
    }
    static async getUsers(req,res){
        try{
            const users = await User.find();
            res.status(200).json(users);
        } catch(error){
            res.status(500).json({error: error});
        }
        
    }
}

export default UserController;