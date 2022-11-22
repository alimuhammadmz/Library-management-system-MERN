const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const isAuthenticUser = async (req, res, next) =>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({'message':"Please login to continue!"});    
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({'credentials.userName' : decodedData});

    req.User = user;
    next();
}

module.exports.isAuthenticUser = isAuthenticUser;
