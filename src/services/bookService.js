const Book = require('../models/bookModel.js');

const addNewBook = async (book) =>{
    const newBook = new Book(book);

    const bookAdded = await newBook.save();
    if(bookAdded){
        return bookAdded;
    }
}

const getAllBooks = async () =>{
    const books =  await Book.find();
    if(books){
        return books;
    }
}

const deleteBookById = async (id) =>{
    const bookDeleted =  await Book.findOneAndDelete({_id : id});
    if(bookDeleted){
        return bookDeleted;
    }
}

const getBookById = async (id) =>{
    const book =  await Book.findOne({_id : id});
    if(book){
        return book;
    }
}

const checkOutBook = async (id, updates) =>{
    const bookUpdated =  await Book.findOne({_id : id});
    if(bookUpdated){
        bookUpdated.borrowerDetails = updates;
        bookUpdated.check_Status = "checkedOut";
        const checkedOut = await bookUpdated.save();
        if(checkedOut)
            return checkedOut;
    }
}

const checkInBook = async (id) =>{
    const bookChecked =  await Book.findOne({_id : id});
    let today = Date.now();
    if(bookChecked){
        const borrower = {
            name: bookChecked.borrowerDetails.name,
            checkedOutAt: bookChecked.borrowerDetails.checkedOutAt,
            checkedInAt: today
        }
        bookChecked.borrowerDetails = undefined;
        bookChecked.check_Status = "checkedIn";
        bookChecked.checkOutHistory.push(borrower);
        const checkedIn = await bookChecked.save();
        if(checkedIn)
            return checkedIn;
    }
}

const getPenalty = async (id) =>{
    let today = Date.now();
    var fineToBePaid = 1;
    var daysExceed = 0;
    const bookPenalty =  await Book.findOne({_id : id});
    if(bookPenalty){
        //logic for counting weekends
        var toBeCheckedIn = bookPenalty.borrowerDetails.toBecheckedIn;
        if(today>toBeCheckedIn){
            var i = 0;
            var days = 0;
            var weekends = 0;
            while(toBeCheckedIn<today){
                if(toBeCheckedIn.getDay() != 6 && toBeCheckedIn.getDay() != 0){
                    i++;
                }else{
                    weekends++;
                }
                days++;
                toBeCheckedIn = new Date(toBeCheckedIn.setDate(toBeCheckedIn.getDate()+1))
            }
        //logic for counting weekends
        }
        if(bookPenalty.borrowerDetails){
            daysExceed = Math.abs(today - bookPenalty.borrowerDetails.toBecheckedIn); 
            daysExceed = Math.ceil(daysExceed / (1000 * 60 * 60 * 24))-weekends; 
            if(daysExceed>0)
                fineToBePaid = daysExceed*5;            //5 rupees fine per day
        }
    }
    return fineToBePaid;
}

const getAvailableBook = async () =>{
    const bookChecked =  await Book.find({check_Status : "checkedIn"});
    if(bookChecked){
        return bookChecked;
    }
}

const getCheckedoutBook = async () =>{
    const bookChecked =  await Book.find({check_Status : "checkedOut"});
    if(bookChecked){
        return bookChecked;
    }
}

module.exports.addNewBook = addNewBook;
module.exports.getAllBooks = getAllBooks;
module.exports.getBookById = getBookById;
module.exports.deleteBookById = deleteBookById;

module.exports.checkOutBook = checkOutBook;
module.exports.checkInBook = checkInBook;
module.exports.getPenalty = getPenalty;
module.exports.getAvailableBook = getAvailableBook;     // returns available or already checking books
module.exports.getCheckedoutBook = getCheckedoutBook;     // returns all borrowed books
