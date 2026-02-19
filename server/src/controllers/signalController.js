const { createSignal, getRecentSignals } = require("../models/signalModel");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {

    try{
        const { title, content, token } = req.body;

        if(!token){
            return res.status(401).json({ message: "Invalid Token" });
        }

        let user;

        try{

            user = jwt.verify(token, process.env.JWT_SECRET);

        }catch(error){
            console.error(error);
            return res.status(401).json({
                message: "Invalid Token"
            })
        }
        

        //returns error if title is missing
        if(!title || !title.trim()){
            return res.status(400).json({ message:"Invalid Title" }); 
        }
        
        //returns error if content is missing
        if(!content || !content.trim()){
            return res.status(400).json({ message:"Invalid Content" });
        }


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

        res.status(200).json({  // 200 is standard success response for get request
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
