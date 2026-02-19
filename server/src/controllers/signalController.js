const { createSignal, getRecentSignals } = require("../models/signalModel");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {

    try{
        const { title, content, token } = req.body;

        //returns error if title is missing
        if(!title.trim()){
            return res.status(400).json({ message:"Invalid Title" }); 
        }
        
        //returns error if content is missing
        if(!content.trim()){
            return res.status(400).json({ message:"Invalid Content" });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);

        //const createSignal = async (title, content, userid) => {

        const newSignal = await createSignal( title, content, user.id );

        res.status(201).json({
            message: "Signal created successfully",
            signal: newSignal,
        })

    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }

}

/*
add new handler that calls the model function and returns tje row
*/

const recent = async (req, res) => {
    try{
        const recentSignals = await getRecentSignals();

        if(!recentSignals){
            return res.status(404).json({ message:"No recent signals" });
        }

        res.status(201).json({
            message: "Signals retrieved successfully",
            signals: recentSignals
        })
        
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}



module.exports = { create, recent };