import jwt from "jsonwebtoken"
export const checkUserAuth = async(req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if(!decoded?._doc){
        res.status(403).json({
            message: "User is not authenticated"
        })
    }
    req.user = decoded?._doc
    next()
}