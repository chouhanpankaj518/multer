import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import 'dotenv/config';
import multer from 'multer'
import path from 'path'
import { imagemodel } from './model.js';

let app=express()
app.use(cors())
app.use(bodyParser())
app.use('/uploads',express.static ('uploads'))
mongoose.connect(process.env.MONGODB_URI)
let port =process.env.PORT

let storage = multer.diskStorage({
    destination:function(req , file, cb){
        cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        let ext =path.extname(file.originalname)
        cb(null,`${file.fieldname}-${Date.now()}-${ext}`)
    }
})

let upload = multer({storage:storage})

app.post("/api/post",upload.single("fileupload"),(req,res)=>{
    let newfile={
        filename:req.file.filename,
        filepath:req.file.path
    }
    let file = new imagemodel(newfile)
    file.save()
   
})

app.get("/api/get",async(req,res)=>{
         let file = await imagemodel.find()
         res.json(file)
})

app.get("/api",(req,res)=>{
    res.send("done")
})

app.listen(port,()=>{
    console.log(
        "server is running 5600"
    )
})