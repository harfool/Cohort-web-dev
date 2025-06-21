import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
import { MongoConnection } from './utils/db.js'
dotenv.config()

// import routes
import userRoutes from "./routes/user.routes.js"
const app = express()

// mongoDB connection
MongoConnection()

app.use(cors({
    origin : "http://localhost:8000",
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    credentials : true,
    allowedHeaders : ["Content-Type" , "Authorization"]

}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const PORT =  process.env.PORT || 8000
app.get("/" ,(req , res)=>{
  res.send("hlo ")
})


//  user routes
app.use("/api/v1/users" , userRoutes)

app.listen(PORT , ()=>{
    console.log(`server running on port ${PORT}`)
})