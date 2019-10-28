/**
 * @author khanhhn on 21/10/2019
 * File này chứa các Models, Schemas, hàm kết nối cơ sở dũ liệu MongoDB
 */
const mongoose = require('mongoose')
const {Schema} = mongoose //Kĩ thuật destructing trong JS
const {ObjectId} = Schema
//Kết nối cơ sở dữ liệu MongoDB
const connectDatabase = async () => {
    try {
        let uri = 'mongodb://khanhhn:123456@127.0.0.1:27018/fullstackNodejs2018'
        let options = {
            connectTimeoutMS: 10000,
            useNewUrlParser: true,
            useCreateIndex: true,
        }
        await mongoose.connect(uri, options)
        console.log('Connect Mongo Database sucessfully!')
    } catch (error) {
        console.log(`Cannot connect Mongo. Error: ${error}`)
    }
}
connectDatabase()
const UserSchema = new Schema({
    //schema: cấu trúc của một collection
    name: {type: String, default: 'unknown'},
    age: {type: Number, min: 18, index: true},
    email: {type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/},
    //Trường tham chiếu, một user viết nhiều blogpost
    blogPosts:[{type:mongoose.Schema.Types.ObjectId,ref:'BlogPost'}]
})
const BlogPostSchema = new Schema({
    title: {type: String, default: 'haha'},
    content: {type: String,default: ''},
    date: {type: Date, default: Date.now()},
    //Trường tham chiếu, 1 blogpost do 1 người viết
    author:{type:mongoose.Schema.Types.ObjectId, ref: "User"}
})
// Chuyển từ Schema sang Model
const User = mongoose.model('User', UserSchema)
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
//export để các file khác có thể sử dụng
module.exports = { User, BlogPost }

