const { createSignal, getRecentSignals, getSignalsByUser, deleteSignalById, getSignalById } = require("../models/signalModel");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {

    try{
        const { title, content } = req.body;

        const user = req.user;

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

const recent = async (req, res) => {
    try{

        const page = req.query.page;
        if(!page || page < 0 ){
            page = 0;
        }

        const limit = 10;
        const offset = (page * limit);

        const returned = await getRecentSignals(limit, offset);

        const recentSignals = returned.recentSignals;
        const hasMore = returned.hasMore;

        if(!recentSignals){
            return res.status(404).json({ message:"No recent signals" });
        }

        res.status(200).json({  // 200 is standard success response for get request
            message: "Signals retrieved successfully",
            signals: recentSignals,
            hasMore: hasMore
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

        const user = req.user;

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

        const userid = req.user.id;

        const signal = await getSignalById(id);

        if(signal.user_id !== userid ){
            return res.status(403).json({ message: "Missing Authorization"})
        }

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
