import jwt from "jsonwebtoken";
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {

    try{
        const accessToken = req.cookies.accessToken;

        if (!accessToken){
            return res.status(401).json({ message: "Unauthorized - No access token provided"});
        }

        try {

            // we generated the token with the use of user id and access token secret now we are converting the access token to user id again by using the access token secret. 
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);   // we are verifying the token
            
            // access token ke through jo userUd aayi usko user variable me store kro without password
            const user = await User.findById(decoded.userId).select("-password");

            if (!user){
                return res.status(401).json({ message: "Unauthorized - User not found."});
            }

            
            req.user = user;

            next()   // then call the next function
        }
    

        catch (error) {
            if (error.name === "TokenExpiredError"){
                return res.status(401).json({ message: "Unauthorized - Token has expired."});
            }
        }

        throw error;       // agr token expired wala error nahi h to error ko throw karo, isse niche wale catch me show krenge error ko
    }

    catch(error){
        console.log("Error in protectRoute middleware", error.message)
        return res.status(401).json({ message: "Unauthorized - Invalid access token." });
    }
}




export const adminRoute = (req, res, next) => {
    // if req.user is not None and the role of the user is admin then we will call the next function and in this the next function will be decided from where this function was called from.
    
    if ( req.user && req.user.role === "admin" ){
        next()
    }
    else{
        return res.status(403).json({ message: "Access Denied - Admin only"});
    }
}