const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        maxLength: 20,
        required: true
    },
    publishYear: {
        type: Date
    },
    coverPrice: {
        type: Number,
        required: true
    },
    check_Status: {
        type: String,
        enum: ['checkedIn', 'checkedOut'],
        default: 'checkedIn',               //checkedIn = available in library
        required: true
    },
    borrowerDetails: {                      //for current borrower
        name: {
            type: String,
            maxLength: 25,
            trim: true,
            index: {
              unique: true,
              partialFilterExpression: {email: {$type: 'string'}},
            },
            set: v => (v === '' ? null : v)
        },
        cellNo: {
            type: String,
            maxLength: 11
        },
        NIC: {
            type: Number,
            maxLength: 11
        },
        checkedOutAt: {                
            type: Date
        },
        toBecheckedIn: {                
            type: Date
        }
    },
    checkOutHistory: [                  //will be updated on returning the book
        {
            name: {
                type: String,
                required: true
            },
            checkedOutAt: {                
                type: Date
            },
            checkedInAt: {                
                type: Date
            }
        }
    ]
});

module.exports = mongoose.model("Book", bookSchema);