import mongoose from 'mongoose'

mongoose.set('strictQuery',false)

let conn = "mongodb+srv://admin:csse3101@studentcluster.brb8q.mongodb.net/Utas?retryWrites=true&w=majority&appName=StudentCluster";
mongoose.connect(conn).then(()=>console.log("Database Connected ")).catch((e)=>console.log(e));



