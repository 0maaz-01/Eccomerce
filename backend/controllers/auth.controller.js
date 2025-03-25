import User from  "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";



// function that will generate the tokens.
const generateTokens = (userId) => {
					// generate the token for this used id
	const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",		// after 15 minutes this token will expire
	})

	const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",		// after 7 days this token will expire
	})

	return { accessToken, refreshToken}
};




// storing the refresh token in redis
const storeRefreshToken = async(userId, refreshToken) => {
	// ex - expiry, 7 * 24 * 60 * 60 = 7 days
	await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7*24*60*60)
}


// creating a set cookies function
const setCookies = (res, accessToken, refreshToken) => {

	// name of the cookie and the cookie itself
	res.cookie("accessToken", accessToken, {
		httpOnly : true,      // to prevent XSS attack, cross site scripting attacks
		secure:process.env.NODE_ENV === "production",
		sameSite : "strict",   		// prevents CSRF attack, cross-site request forgery
		maxAge : 15 * 60 * 1000  	// 15 minutes = 15 (min) * 60 (seconds) * 1000 (milliseconds)
	})

	// name of the cookie and the cookie itself
	res.cookie("refreshToken", refreshToken, {
		httpOnly : true,      // to prevent XSS attack, cross site scripting attacks
		secure:process.env.NODE_ENV === "production",
		sameSite : "strict",   		// prevents CSRF attack, cross-site request forgery
		maxAge : 7 * 24 * 60 * 60 * 1000  	// 7 days
	})
}




// setting up the responses that will be sent to the user when they visit http://localhost:5000/api/auth/ + placeholder

export const signup = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

        const user = await User.create({name, email, password})

		// authenticate            user._id represents the id stored in the mongodb file
		const { accessToken, refreshToken } = generateTokens(user._id)
		await storeRefreshToken(user._id, refreshToken);	// store the refresh token in redis

		setCookies(res, accessToken, refreshToken)

		res.status(201).json({ 
				_id : user._id, 
				name : user.name,
				email : user.email,
				role : user.role
			});
	} 
	
	catch (error) {
		res.status(500).json({ message: error.message });
	}
};







export const login = async (req, res) => {
    try{
		const {email, password} = req.body
		const user = await User.findOne({email});

		// agr user exist krta h and password matches.
		if (user && (await user.comparePassword(password))){

			// create tokens
			const { accessToken, refreshToken } = generateTokens(user._id);

			// store the tokens
			await storeRefreshToken(user._id, refreshToken)

			// set the cookies
			setCookies(res, accessToken, refreshToken)

			res.json({
				_id : user._id,
				name : user.name,
				email : user.email,
				role : user.role
				})
			}
		

		else {
			res.status(400).json({message : "Invalid email or password"})
		}
	}

	catch(error){
		res.status(500).json({ message: error.message });
	}
}







export const logout = async (req, res) => {
    try{
		const refreshToken = req.cookies.refreshToken;

		// to verify the token
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			
			// to delete the redis user id
			await redis.del(`refresh_token:${decoded.userId}`)
		}
		// to delete the access and refresh tokens.
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message : "Logged out successfully." })
	}

	catch(error) {
		res.status(500).json({message : "Server Error", error : error.message})
	}
}





// this will refresh the access token after every 15 minutes if the user is logged in
export const refreshToken = async (req, res) => {

	try{
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided." });
		}

		// verify the refresh token
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		
		// to store the token
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
	
		// if the user is trying to perform a scam
		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Refresh token does not match the stored token" });
		} 

		// generate the token for this used id
		const accessToken = jwt.sign({ userId : decoded.userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn : "15m" });
	
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure : process.env.NODE_ENV === "production",
			sameSite : "strict",
			maxAge: 15 * 60 * 1000 // 15 minutes in milliseconds
		})

		res.json({ message : "Token refreshed successfully."})
	}

	catch(error) {
		console.log("Error in refreshToken controller", error.message)
		res.status(500).json({ message : "Server error", error : error.message});
	}
}



// export const getProfile = async (req, res) => {}