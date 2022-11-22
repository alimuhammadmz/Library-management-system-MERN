const express = require('express');
const {addNewBook, getBookById, deleteBookById, getAllBooks,
    checkOutBook, checkInBook, getPenalty,
    getAvailableBook, getCheckedoutBook} = require('../services/bookService.js');
const bcrypt = require('bcryptjs');
const result2 = "Some error occurred";

const bookInfoController = async (req, res) =>{        //by objId
    try{
        const id = req.params.id;
        const result = await getBookById(id)
        if(result)        
            res.status(200).send(result);
        else
            res.status(404).send("Not found!");
    }catch(err){
        res.status(500).send(err);
    }
}

const addBookController = async (req, res) => {
    var book = { 
        bookTitle: req.body.bookTitle,
        ISBN: req.body.ISBN,
        publishYear: req.body.publishYear,
        coverPrice: req.body.coverPrice
    }

    const result = await addNewBook(book);
    if(!result){
        return res.status(404).json({'message':result2});
    }else
        return res.status(201).json({'message':result});
}

const getAllBookController = async (req, res) =>{   
    const book = await getAllBooks();
    if(!book)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':book});
}

const bookDeleteController = async (req, res) =>{
    try{
        var filter = req.params.id
        const deleted = await deleteBookById(filter);
        if(deleted)        
            res.sendStatus(200);
        else
            res.sendStatus(204);
    }catch(err){
        res.status(500).send(err);
    }
}

const checkOutBookController = async (req, res) =>{
    let today = Date.now();

    //logic for excluding weekends
    var curr = new Date;
    var i = 0;
    var days = 0;
    while(i<15){
        if(curr.getDay() != 6 && curr.getDay() != 0){ i++; }
        days++;
        curr = new Date(curr.setDate(curr.getDate()+1))
    }
    var toBecheckIn = new Date(curr.setDate(curr.getDate()));
    //logic for excluding weekends

    const objId = req.params.id;
    var borrowerDetails = {
        name: req.body.name,
        cellNo: req.body.cell,
        NIC: req.body.NIC,
        checkedOutAt: today,
        toBecheckedIn: toBecheckIn,
    }
    const result = await checkOutBook(objId, borrowerDetails);       //borrow book
    if(!result){
        return res.status(404).json({'message':result2});
    }else
        return res.status(201).json({'message':result});
        
}

const checkInBookController = async (req, res) =>{
    try{
        const id = req.params.id;
        const result = await checkInBook(id);
        if(result)        
            res.status(200).send(result);
        else
            res.status(404).send("Not found!");
    }catch(err){
        res.status(500).send(err);
    }
}

const getPenaltyController = async (req, res) =>{
    try{
        const id = req.params.id;
        const result = await getPenalty(id);
        var fine = Number((result).toFixed(1));
        if(result){   
            if(fine == 1){ fine = 0; }     
            res.status(200).send(fine.toString()+"Rupees");
        }
        else
            res.status(404).send("Not found!");
    }catch(err){
        res.status(500).send(err);
    }
}

const getAvailableBookController = async (req, res) =>{
    try{
        const result = await getAvailableBook();
        if(result)        
            res.status(200).send(result);
        else
            res.status(404).send("Not found!");
    }catch(err){
        res.status(500).send(err);
    }
}

const getAllCheckedoutBookController = async (req, res) =>{
    try{
        const result = await getCheckedoutBook();
        if(result)        
            res.status(200).send(result);
        else
            res.status(404).send("Not found!");
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports.addBookController = addBookController;
module.exports.bookInfoController = bookInfoController;     //returns specific book's record
module.exports.getAllBookController = getAllBookController;
module.exports.bookDeleteController = bookDeleteController;

module.exports.checkOutBookController = checkOutBookController;
module.exports.checkInBookController = checkInBookController;
module.exports.getPenaltyController = getPenaltyController;
module.exports.getAvailableBookController = getAvailableBookController;
module.exports.getAllCheckedoutBookController = getAllCheckedoutBookController;
