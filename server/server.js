const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const routes=require('./routes/route')
const port=3000

const app=express()

app.use(cors({
    origin:['http://localhost:4200'],
    credentials:true
}))


app.use(cookieParser())
app.use(express.json())

app.use("/api",routes)
const uri = "mongodb+srv://tendrako:NCHJs1BI8fLfVE4g@cluster0.kooda.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri,{
    useNewUrlParser:true,
})
.then(()=>{
    console.log("connected to database")

    app.listen(port,()=>{
        console.log(`API listening to http://localhost:${port}`)
    })
})
