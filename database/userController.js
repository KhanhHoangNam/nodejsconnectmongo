/**
 * @author khanhhn on 23/10/2019
 * @project nodejsapp
 * @version 1.0
 */
const {User} = require('./models')
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