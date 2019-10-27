/**
 * @author khanhhn on 23/10/2019
 * @project nodejsapp
 * @version 1.0
 */
const {User} = require('./models')
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
const updateUser = async (userId, name, email, age) => {
    try {
        let newUser = {}
        //Nếu không nhập "name" thì không update "name"
        if(email !== undefined) {
            newUser.email = email
        }

        if(age !== undefined) {
            newUser.age = age
        }

        if(name !== undefined) {
            newUser.name = name
        }

        let updatedUser = await User.findOneAndUpdate(
            {_id: ObjectId(userId)},
            newUser
        )

        if(updatedUser !== null) {
            console.log(`Update thành công user. New user = ${JSON.stringify(newUser)}`)
        } else {
            console.log("Không tìm thấy bản ghi để cập nhật")
        }
    } catch (error) {
        console.log(`Không thể cập nhật user. Erorr: ${error}`)
    }
}
module.exports = {
    insertUser, 
    deleteAllUsers,
    findUserById,
    findSomeUsers,
    updateUser
}