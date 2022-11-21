const express = require('express');
const {validateCredentials, addNewUser, updateUserById, getUserById, deleteUserById, getAllUsers} = require('../services/userService.js');
const bcrypt = require('bcryptjs');
const { getToken } = require('../utils/jwtToken.js');
const result2 = "Some error occurred";

const userInfoController = async (req, res) =>{        //by objId
    try{
        const id = req.params.id;
        const result = await getUserById(id)
        if(result)        
            res.status(200).send(result);
        else
            res.status(404).send("Not found!");
    }catch(err){
        res.status(500).send(err);
    }
}

const userUpdateController = async (req, res) =>{
    try{
        const id = req.params.id;
        const updates = req.body.updates
        const updated = await updateUserById(id, updates);
        if(updated)        
            res.sendStatus(204);
        else
            res.status(404).send("Not found!");
    }catch(err){
        res.status(500).send(err);
    }
}

const addUserController = async (req, res) => {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    var credentials = {
        userName: req.body.userName,
        password: hashedPass,
    }
    let today = Date.now();

    var user = {
        credentials: credentials,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        vehicleRegistrationNumber : req.body.vehicleRegistrationNumber,
        vehicleType: req.body.vehicleType,
        createdAt: today,
        NIC: req.body.NIC,
        cell: req.body.cell
    }

    const result = await addNewUser(user);
    if(!result){
        return res.status(404).json({'message':result2});
    }else
        return res.status(201).json({'message':result});
}

const loginUserController = async(req, res) => {
    const {userName, password} = req.body;
    if(!userName || !password)
        return res.status(401).json({'message':"Please enter email and password both!"});
    const valid = await validateCredentials(userName, password);
    if(!valid)
        return res.status(401).json({'message':"Please Enter valid Credentials!"});

    const token = await getToken(valid);
    return res.status(200).cookie('token', token).json({success: true, valid, token});
}

const logoutUserController = async(req, res) => {
    res.clearCookie('token');
    return res.status(200).json({success: true, message: "Logged out successfully."});
}

const getAllUserController = async (req, res) =>{   
    const user = await getAllUsers();
    if(!user)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':user});
}

const userDeleteController = async (req, res) =>{
    try{
        var filter = req.params.id
        
        const deleted = await deleteUserById(filter);
        if(deleted)        
            res.sendStatus(200);
        else
            res.sendStatus(204);
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports.addUserController = addUserController;
module.exports.userInfoController = userInfoController;     //returns specific user's record
module.exports.getAllUserController = getAllUserController;
module.exports.userUpdateController = userUpdateController;
module.exports.userDeleteController = userDeleteController;

module.exports.loginUserController = loginUserController;
module.exports.logoutUserController = logoutUserController;