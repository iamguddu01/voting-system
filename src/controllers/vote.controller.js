import db from "../models/index.js";
import bcrypt from "bcryptjs";
const { Team, Vote, Election } = db;

export const handleCastUserVotes = async(req, res)=>{
    try {
        const {userId, electionCode, votedTo} = req.body;
        if(!userId || !electionCode || !votedTo){
            return res.status(400).json({
                message: "Some mandatory fields are missing."
            })
        }
        const election = await Election.findOne({electionCode})
        if(!election){
            return res.status(400).json({
                message: "election does not exist."
            })
        }
        const team = await Team.findById(votedTo);
        if(!team){
            return res.status(400).json({
                message: "No such team exist."
            })
        }
        if(!election.participatingTeam?.includes(votedTo)){
            return res.status(400).json({
                message: "team is not participating in election."
            })
        }
        const vote = await Vote.findOne({userId, electionCode});
        if(vote){
            return res.status(400).json({
                message: "user has already voted."
            })
        }
        const hash = bcrypt.hashSync(votedTo, 10)
        const newVote = await Vote.create({
            userId,
            electionCode,
            votedTo: hash,
        });
        return res.status(201).json({
                message: "voted successfully."
            })
    } catch (error) {
        console.log("error=>", error);
    }
}

export const handleVoteCalculations = async(req, res)=>{
    try {
        const electionCode = req.params.electionCode
        if(!electionCode){
            return res.status(400).json({
                message: "missing election code"
            })
        }
        const election = await Election.findOne((electionCode)).populate("participatingTeam");
        if(!election){
            return res.status(400).json({
                message: "Invalid election code"
            })
        }

        const teams = election?.participatingTeam || []
        const teamMapper = {};
        for(i=0; i<teams?.length; i++){
            teamMapper[teams?.[i]?._id] = {...teams?.[i]?._doc, voteCount:0}
        }

        const votes = await Vote.find({
            electionCode
        })
        for(let i=0; i<votes?.length; i++){
            const hashedVotes = votes?.[i]?.votedTo;
            for(let j=0; j<teams?.length; j++){
                const id = teams?.[j]?._id+""
                const comparison = bcrypt.compareSync(id, hashedVotes)
                if(comparison){
                    teamMapper[id]= {...teamMapper?.[id], voteCount:teamMapper?.[id]?.voteCount+1}
                }
            }
        }

        

        return res.status(200).json({
            result: Object.values(teamMapper)
        })
    } catch (error) {
        console.log("error=>handleVoteCalculations", error);
    }
}