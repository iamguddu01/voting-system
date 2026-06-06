import mongoose from "mongoose";

export const handleMongoDbConnection = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/voting_system")
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Error while connecting DB", error);
    }
}