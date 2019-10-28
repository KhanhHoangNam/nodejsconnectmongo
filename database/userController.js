/**
 * @author khanhhn on 23/10/2019
 * @project nodejsapp
 * @version 1.0
 */
const {User, BlogPost} = require('./models')
const {ObjectId} = require('mongoose').Types
//Hàm insert 1 user mới
const insertUser = async (name, age, email) => {
    try {
        const user = new User()
        user.name = name
        user.age = age
        user.email = email
        await user.save()
        console.log(`Thêm mới bản ghi ${JSON.stringify(user)} thành công`)
    } catch (error) {
        console.log(`Không thể thêm mới bản ghi user.Error: ${error}`)
    }
}
//Muốn xóa tất cả các bản ghi(doc) => cẩn thận khi dùng
const deleteAllUsers = async () => {
    try {
        await User.deleteMany({})
        console.log('Đã xóa hết các bản ghi user')
    } catch (error) {
        console.log(`Không thể xóa hết các user.Error: ${user}`)
    }
}
//Tìm kiếm một doc nào đó theo id
const findUserById = async (userId) => {
    try {
        let foundUser = await User.findById(userId)
        console.log(`foundUser = ${JSON.stringify(foundUser)}`)
    } catch (error) {
        console.log(`Không tìm thấy User. Error: ${error}`)
    }
}
//Hiện tất các users, hiện có điều kiện
const findSomeUsers = async () => {
    try {
        let foundUsers = await User.find(
            {}, //Hiện tất cả các users
            //Tìm những người có tuổi >=30,
            //tên có chứa "le", không phân biệt hoa-thường()
            // {age: {$gte: 30}, name: /ss/i}, //insensitive-case
            ["name", "email", "age"],
            //Sắp xếp
            {
                sort: {
                    name: -1
                }
            }
        ).skip(0).limit(5) //Bỏ qua 0 bản ghi, chỉ hiện 5
        foundUsers.forEach(user => {
            console.log(`user: ${JSON.stringify(user)}`)
        });
        console.log(`Tổng số: ${foundUsers.length}`)
    } catch (error) {
        console.log(`Không tìm thấy users. Error: ${error}`)
    }
}
// const updateUser = async (userId, name, email, age) => {
//     try {
//         let newUser = {}
//         //Nếu không nhập "name" thì không update "name"
//         if(email !== undefined) {
//             newUser.email = email
//         }

//         if(age !== undefined) {
//             newUser.age = age
//         }

//         if(name !== undefined) {
//             newUser.name = name
//         }

//         let updatedUser = await User.findOneAndUpdate(
//             {_id: ObjectId(userId)},
//             newUser
//         )

//         if(updatedUser !== null) {
//             console.log(`Update thành công user. New user = ${JSON.stringify(newUser)}`)
//         } else {
//             console.log("Không tìm thấy bản ghi để cập nhật")
//         }
//     } catch (error) {
//         console.log(`Không thể cập nhật user. Erorr: ${error}`)
//     }
// }
//Kết hợp findbyId và update
const updateUser = async (userId, name, email, age) => {
    try {
        let foundUser = await User.findById(userId)
        if(!foundUser) {
            console.log(`Không tìm thấy user với id=${userId} để cập nhật`)
            return
        } 
        foundUser.name = (name !== undefined) ? name : foundUser.name
        foundUser.email = (email !== undefined) ? email : foundUser.email
        foundUser.age = (age !== undefined) ? age : foundUser.age
        await foundUser.save()
        console.log(`update thành công. User = ${JSON.stringify(foundUser)}`)
    } catch (error) {
        console.log(`Không update được thông tin user. Error: ${error}`)
    }
}

const deleteUser = async (userId) => {
    try {
        await User.deleteOne({_id:ObjectId(userId)})
        console.log(`Xóa thành công user với id = ${JSON.stringify(userId)}`)        
    } catch (error) {
        console.log(`Không thể xóa user. Error: ${error}`)
    }
}
//Case study: Tạo một user, user này "viết" 5 bài post
const createSomeUsersAndPosts = async() => {
    try {
        const mrKhanhCartoon = new User({
            name: "mr.Nam Khanh",
            age: 24,
            email: "khanh@gmail.com",
            blogPosts: []
        })
        //Danh sách 5 bài post
        const firstBlogPost = new BlogPost({
            title: "Phim hoạt hình Tom&Jerry",
            content: "Đây là phim hoạt hình dành cho các cháu thiếu nhi",
            date: Date.now(),
            author: mrKhanhCartoon._id 
        })
        await firstBlogPost.save()
        await mrKhanhCartoon.blogPosts.push(firstBlogPost)
        await mrKhanhCartoon.save()
        //
        const secondBlogPost = new BlogPost({
            title: "Toy Story-câu chuyện đồ chơi", 
            content: "Đây là phim hoạt hình của Pixar, hình ảnh đẹp", 
            date: Date.now(), 
            author: mrKhanhCartoon._id 
        })
        await secondBlogPost.save()
        await mrKhanhCartoon.blogPosts.push(secondBlogPost)
        await mrKhanhCartoon.save() 
        //
        const thirdBlogPost = new BlogPost({
            title: "Frozen-nữ hoàng băng giá", 
            content: "Nữ hoàng Elsa sử dụng phép thuật để tạo nên tòa lâu đài băng giá trên núi", 
            date: Date.now(), 
            author: mrKhanhCartoon._id 
        })
        await thirdBlogPost.save()
        await mrKhanhCartoon.blogPosts.push(thirdBlogPost)
        await mrKhanhCartoon.save() 
        console.log(`Tạo thành công danh sách User và BlogPost`)
    } catch (error) {
        console.log(`Không tạo được các bản ghi. Error: ${error}`)
    }
}
module.exports = {
    insertUser, 
    deleteAllUsers,
    findUserById,
    findSomeUsers,
    updateUser,
    deleteUser,
    createSomeUsersAndPosts
}