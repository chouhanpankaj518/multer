import mongoose from "mongoose"

const imageshema = new mongoose.Schema({
    filename:String,
    filepath:String,
    uploadDate:{type:Date , default:Date.now}
})

export  const imagemodel= mongoose.model("image",imageshema)

