import mongoose from 'mongoose'

export const MongoConnection =  () => {
    const MongoUrl = process.env.MONGO_URL
    mongoose.connect(MongoUrl)
    .then(()=>{
        console.log("mongoDB is connected")
    })
    .catch((error)=>{
        console.log("mongoDb connection failed" , error)
    })
}