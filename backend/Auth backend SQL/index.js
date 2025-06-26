import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoutes from "./routes/auth.routes.js"
dotenv.config()

const Port = process.env.PORT || 3000

const app = express()

// middlewares
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({extended : true}))

app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    credentials : true,
    allowedHeaders : ["Content-Type" , "Authorization"]
}))

app.use("/api/v1/users" , userRoutes)


app.listen(Port , ()=>{
    console.log(`Server running on Port :  ${Port}`)
})