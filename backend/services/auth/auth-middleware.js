import jwt from 'jsonwebtoken'

function authenticateToken(permission){
    return (req, res, next) => {
        const token = req.headers['authorization']
        if(token == null) return res.status(401).json({message: 'Unauthorized'})
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) return res.status(403).json({message: 'Forbidden'})
            if(permission != user.isAdmin) return res.status(403).json({message: 'Forbidden'})
            next()
        })
    }
}

export default authenticateToken