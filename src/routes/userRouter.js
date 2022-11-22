const express = require("express");
const {addUserController, userDeleteController,
    getAllUserController, userInfoController, userUpdateController,
    loginUserController, logoutUserController} = require('../controllers/userController.js');
const {isAuthenticUser} = require('../middlewares/auth.js');

const router = express.Router();

router.post('/add', isAuthenticUser, addUserController);
router.get('/', isAuthenticUser, getAllUserController);
router.get('/specific/:id', isAuthenticUser, userInfoController);
router.put('/update/:id', isAuthenticUser, userUpdateController);
router.delete('/delete/:id', isAuthenticUser, userDeleteController);

router.post('/login', loginUserController);
router.get('/logout', isAuthenticUser, logoutUserController);

module.exports = router;