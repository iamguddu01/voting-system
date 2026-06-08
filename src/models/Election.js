import mongoose, { Schema } from "mongoose";
const electionSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    electionCode: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String,
    },
    participatingTeam: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: []
        },
    ],
})

export const Election = mongoose.model("Election", electionSchema)