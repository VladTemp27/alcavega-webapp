import jwt from 'jsonwebtoken'
const isDebugMode = process.env.BYPASS_AUTH == 'true'

function authenticateToken(permission){
    return (req, res, next) => {
        if(isDebugMode){
            console.log('BYPASS AUTH ENABLED')
            next()
            return
        }
        const token = req.headers['authorization']
        console.log(token)
        if(token == null) return res.status(401).json({message: 'Unauthorized'})
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) return res.status(403).json({message: 'Forbidden'})
            if(permission != user.isAdmin) return res.status(403).json({message: 'Forbidden'})
            next()
        })
    }
}

export default authenticateToken