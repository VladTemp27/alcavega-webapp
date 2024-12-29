import jwt from 'jsonwebtoken'
import User from '../../models/users.model.js'
import dotenv from 'dotenv'
dotenv.config()

class AuthController{
    static async handleLogin(req, res){
        const { username, password } = req.body
        try{
            const user = await User.findOne({ username: username })
            console.log(user)
            if(password === user.password){
                var genToken = jwt.sign({ username: user.username, isAdmin: user.isAdmin},process.env.SECRET_KEY,{expiresIn:'1d'})
                console.log(genToken)
                res.status(200).json({message: 'Login Successful', token: genToken})
                return
            }
            res.status(401).json({message: 'Invalid Password'})
        }catch(error){
            res.status(500).json({message: 'Login Failed', error: error.message})
        }
    }
}

export default AuthController