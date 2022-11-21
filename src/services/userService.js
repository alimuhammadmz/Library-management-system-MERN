const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');

const addNewUser = async (user) =>{
    const newUser = new User(user);

    const userAdded = await newUser.save();
    if(userAdded){
        return userAdded;
    }
}

const updateUserById = async (id, updates) =>{
    const userUpdated =  await User.findOneAndUpdate({_id : id}, updates);
    if(userUpdated){
        return userUpdated;
    }
}

const getAllUsers = async () =>{
    const users =  await User.find();
    if(users){
        return users;
    }
}

const deleteUserById = async (id) =>{
    const userDeleted =  await User.findOneAndDelete({_id : id});
    if(userDeleted){
        return userDeleted;
    }
}

const getUserById = async (id) =>{
    const user =  await User.findOne({_id : id});
    if(user){
        return user;
    }
}

const validateCredentials = async (user, password) => {
    const result = await User.findOne({'credentials.userName' : user}).select("+credentials.password");
    if(result){
        const check = bcrypt.compareSync(password, result.credentials.password);
        if(check)
            return user;
    } 
}

module.exports.addNewUser = addNewUser;
module.exports.updateUserById = updateUserById;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.deleteUserById = deleteUserById;
module.exports.validateCredentials = validateCredentials;
