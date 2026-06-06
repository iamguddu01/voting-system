import express from "express"
import { configDotenv } from "dotenv"
configDotenv()
import { handlePassportConfig } from "./config/passport.config.js"
import authRoutes from "./routes/auth.route.js"
import { handleMongoDbConnection } from "./config/mongo.config.js"
const app = express()
app.use(express.json())
app.use(authRoutes)
handleMongoDbConnection()
handlePassportConfig()
app.listen(process.env.PORT, ()=>{
    console.log("Server running on http://localhost:5000");
})