const {User} = require('./database/model')
//Tạo một user mới
const user = new User()
user.name = "Khanh"
user.age = 24
user.email = "mrkhanhhoangnam@gmail.com"
user.save(error => {
    if(error) {
        console.log(`Không thể thêm mới bản ghi user.Error: ${error}`)
    } else {
        console.log('Thêm mới bản ghi user thành công')
    }
})