import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_NAME}`)
        console.log("You are connected to the database !")
    }catch{
        console.log("DB connection error !!")
    }
}

export default connectDB