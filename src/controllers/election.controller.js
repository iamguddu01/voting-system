import db from "../models/index.js";

const { Team, Election } = db

export const createElection = async(req, res)=>{
    try {
        const {name, description = "", participatingTeam=[]} = req.body;
        if(!name){
            return res.status(400).json({message: "name, is required"})
        }
        const electionCode = Date.now()+""; 
        let election = await Election.create({
            name,
            description,
            electionCode,
            participatingTeam
        })
        return res.status(201).json({
            message: "Election created successfully"
        })
    } catch (error) {
        return res.status(500).json({message: "Something went wrong while creating election", error: error.message || error})
    }
}

export const getAllElection = async(req, res)=>{
    try {
        const elections = await Election.find({})
        return res.status(200).json({
            message: "elections fetched successfully",
            elections
        })
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong while fetching elections",
            error: error.message || error
        })
    }
}

export const getElectionDetailsById = async(req, res)=>{
    try {
        const electionId = req.params?.id;
        const election = await Election.findById(electionId)
        if(!election){
            return res.status(400).json({message: `election does not exist with this id ${electionId}`})
        }
        return res.status(200).json({
            message: "election fetched successfully",
            election
        })
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong while fetching election",
            error: error.message || error
        })
    }
}

export const deleteElection = async(req, res)=>{
    try {
        const electionId = req.params?.id;
        const election = await Election.findByIdAndDelete(electionId)
        if(!election){
            return res.status(400).json({message: `election does not exist with this code ${electionId}`})
        }
        return res.status(200).json({
            message: "election deleted successfully",
            election
        })
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong while deleting election",
            error: error.message || error
        })
    }
}

export const updateElection = async(req, res)=>{
    try {
        const electionId = req.params?.teamId
        const { payload } = req.body

        let oldElection = await Election.findById(electionId);
        if(!oldElection){
            return res.status(400).json({
                message: "election does not exist with the given id"
            })
        }

        let payloadForUpdate = {}
        let allowedKeys = {
            name:true,
            participatingTeam: true,
            description:true,
        }

        const updatedElection = await Election.findOneAndUpdate(electionId, {...payloadForUpdate}, {new: true}) 
        return res.status(200).json({
            message: "election updated successfully",
            updatedElection
        })
    } catch (error) { 
        return res.status(500).json({
            message:"Something went wrong while updating election",
            error: error.message || error
        })
    }
}