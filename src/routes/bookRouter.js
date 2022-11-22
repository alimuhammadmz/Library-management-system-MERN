const express = require("express");
const {addBookController, bookDeleteController,
    getAllBookController, bookInfoController, getPenaltyController,
    checkInBookController, checkOutBookController} = require('../controllers/bookController.js');
const {isAuthenticUser} = require('../middlewares/auth.js');

const router = express.Router();

router.post('/add', isAuthenticUser, addBookController);
router.get('/', isAuthenticUser, getAllBookController);
router.get('/specific/:id', isAuthenticUser, bookInfoController);        //returns specific book document
router.delete('/delete/:id', isAuthenticUser, bookDeleteController);

router.put('/check-in/:id', isAuthenticUser, checkInBookController);
router.put('/check-out/:id', isAuthenticUser, checkOutBookController);
router.get('/penalty/:id', isAuthenticUser, getPenaltyController);

module.exports = router;