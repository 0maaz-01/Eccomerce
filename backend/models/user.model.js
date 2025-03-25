import mongoose from "mongoose";
import bcrypt from "bcryptjs";    // bcrypt.js module is used to hash the passwords.

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "Name is required."]
        },

        email : {
            type : String,
            required : [true, "Email is required."],
            unique : true,
            lowercase : true,
            trim : true         // remove the spaces from the beginning and the end.
        },

        password : {
            type : String,
            required : [true, "Password is required."],
            // the minimum length of the password should be atleast 8 characters long.
            minlength : [8, "Password must be at least 8 characters long."],
        },

        cartIems : [
            { 
                quantity : {
                    type : Number,
                    default : 1         // when the user adds something to the cart the default property will be one.
                },

                // the reference to the product. 
                product : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "Product"
                }
            },
        ],

        role : {
            type : String,
            // what is the role of the user 
            enum : ["customer", "admin"],
            default : "customer"    // by default it will be set to user
        },
    },
    
    {
        // this basically puts the created at and updated at time in the user document
        timestamps : true 
    }
);




// Pre-save hook to hash password before saving to database.
userSchema.pre("save", async function (next) {
    
    // if the password matches then move to next.
    if (!this.isModified("password")) return next();
    
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next()
    }
    catch {
        next(error)
    }
})



// to compare the passwords
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}


// setting up a mongoose model that interacts with with a MongoDB collection.
const User = mongoose.model("User", userSchema);


export default User;