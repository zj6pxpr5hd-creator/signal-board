const { createSignal, getRecentSignals, getSignalsByUser, deleteSignalById } = require("../models/signalModel");
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


const mine = async (req, res) => {

    try{
        const auth = req.headers.authorization || "";
        const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

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

        const userSignals = await getSignalsByUser(user.id);
    

        res.status(200).json({
            message: "Signals retrieved successfully",
            signals: userSignals
        });
        return;
        
    }catch(error){
        return res.status(500).json({ message: "Server Error"});
    }

};



//DELETE    

const deletesignal = async (req, res) => {
    
    const { id } = req.params;

    try{

        const deletedSignal = await deleteSignalById(id);

        if(deletedSignal.rowCount === 0){
            return res.status(404).json({ message: "Signal Not Found"});
        }

        
        res.status(200).json({ 
            message:"Signal Deleted Successfully",
            deletedSignal: deletedSignal.rows[0]
        });

        return;

    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}




module.exports = { create, recent, mine, deletesignal };
