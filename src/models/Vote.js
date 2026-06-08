import mongoose, { Schema } from "mongoose";
const voteSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    electionCode: {
        type: String,
        required: true
    },
    votedAt: {
        type: Date,
        default: Date.now()
    },
    votedTo: {
        type: String,
        required: true
    }
})

export const Vote = mongoose.model("Vote", voteSchema)