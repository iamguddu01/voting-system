import passport from "passport"
import jwt from "jsonwebtoken"

export const handleGoogleSignIn = async(req, res) => {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign In</title>
        </head>
            <body>
                <h1>Sign In</h1>
                <a href="/auth/google">Sign in with google</a>
            </body>
        </html>
    `
    res.send(html)
}

export const handleGoogleAuth = passport.authenticate('google', { scope: ['email','profile'] }) 

export const handleGoogleCallback = async(req, res)=>{
    passport.authenticate(
        "google",
        {failureRedirect:"/login"},
        (err,user)=>{
            console.log("Recieved user => ", user);
            const secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({...user}, secretKey);
            res.redirect(`/user-authenticated?token=${token}`)
        }
    )(req, res)
}

export const handleUserAuthentication = async(req,res)=>{
    const query = req.query?.token
    res.send(query)
}