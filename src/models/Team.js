import mongoose, { Schema } from "mongoose";
const teamSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    description:{
        type:String,
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

export const Team = mongoose.model("Team", teamSchema)