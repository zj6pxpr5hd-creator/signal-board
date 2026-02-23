const { getSignalsByUser } = require("../models/signalModel");
const jwt = require("jsonwebtoken");


    const account = async (req, res) => {

        try{

            const user = req.user;

            const userSignals = await getSignalsByUser(user.id);

            res.status(200).json({
                message: "Signals retrieved successfully",
                signals: userSignals,
                user: user
            });
            return;
            
        }catch(error){
        
            return res.status(500).json({ message: "Server Error"});

        }

    }


module.exports = { account };