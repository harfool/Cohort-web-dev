import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()


const app = express()

app.use(cors({
    origin : "http://localhost:3000/",
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    credentials : true,
    allowedHeaders : ["Content-Type" , "Authorization"]

}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const PORT =  process.env.PORT || 4000
app.get("/" ,(req , res)=>{
  res.send("hlo ")
})

app.get("/harfool" , (req , res)=>{
 res.send("hlo harfool")
})

app.get("/pooja" , (req , res)=>{
 res.send("hlo pooja")
}
)

app.listen(PORT , ()=>{
    console.log(`server running on port ${PORT}`)
})