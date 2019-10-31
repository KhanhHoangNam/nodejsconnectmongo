const {
    insertUser, 
    deleteAllUsers, 
    findUserById,
    findSomeUsers,
    updateUser,
    deleteUser,
    createSomeUsersAndPosts,
    populateUsers,
    populateBlogPosts,
    populateComments
} = require('./database/userController')
// insertUser('Hoang', 30, 'sunlight4d@gmail.com')
// insertUser('Messi', 32, 'messi.lionel@bfcs.com.vn')
// insertUser('Ronaldo', 34, 'cristiano.ronaldo@bfcs.com.vn')
// insertUser('Lukaku', 32, 'messi.lukaku@bfcs.com.vn')
// insertUser('Robben', 36, 'messi.Robben@bfcs.com.vn')
// insertUser('Neymar', 32, 'messi.lionel@bfcs.com.vn')
// insertUser('Mbappe', 32, 'messi.lionel@bfcs.com.vn')
// insertUser('Aguero', 32, 'messi.lionel@bfcs.com.vn')
// insertUser('Tersgen', 32, 'messi.lionel@bfcs.com.vn')
// insertUser('Nani', 32, 'messi.lionel@bfcs.com.vn')
// insertUser('Tom', 32, 'messi.lionel@bfcs.com.vn')
// insertUser('King Beck', 32, 'messi.lionel@bfcs.com.vn')
// insertUser('Lingard', 32, 'messi.lionel@bfcs.com.vn')
// insertUser('Cao', 32, 'messi.lionel@bfcs.com.vn')
//Thử insert 1 bản ghi lỗi
// insertUser('DCao', 32, 'messi.lionelbfcs.com.vn')
// deleteAllUsers()
// findUserById("5db1d413748c4136f9a3065f") //id lấy ở đâu?
// findSomeUsers()
// updateUser("5db1d413748c4136f9a3065c",
//            "Hoang 3",
//            "hoang@gmail.com",
//            28)
// deleteUser("5db1d413748c4136f9a3065c")  
// createSomeUsersAndPosts()
// populateUsers()
// populateBlogPosts()
populateComments()

