const { getSignalsByUser } = require("../models/signalModel");
const { findUserByUsername } = require("../models/userModel.js"); //imports functions defined inside userModel.js for user creation, searching and checking password
const jwt = require("jsonwebtoken");


    const account = async (req, res) => {

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
                signals: userSignals,
                user: user
            });
            return;
            
        }catch(error){
        
            return res.status(500).json({ message: "Server Error"});

        }

    }


module.exports = { account };