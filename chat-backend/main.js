import app from "./app.js";
import connectDB from "./src/db/db.js";

const PORT = process.env.PORT || 3000

connectDB()
.then(()=>{
    app.get("/",(req,res)=>{
        res.send("Welcome to real estate marketplace")
    })
    
    app.listen(PORT,()=>{
        console.log(`App is listening on port ${PORT}`)
    })
})
.catch((error)=>{
    console.log("Mongo DB connection failed")
    console.log(error)
})