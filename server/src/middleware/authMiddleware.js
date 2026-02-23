const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try{
        //extracts header from request
        const authHeader = req.headers.authorization;

        //checks if header is present
        console.log(authHeader);
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Token not provided" });
        }
        

        //extracts token from header
        const token = authHeader.split(" ")[1];

        //decodes toen
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attaches user to request
        req.user = decoded; 

        next();
            
    } catch(error) {
        return res.status(401).json({ message:"Invalid Token" });
    }
};


module.exports = {authMiddleware}