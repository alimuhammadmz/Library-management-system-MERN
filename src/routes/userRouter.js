const express = require("express");
const {addUserController, userDeleteController,
    getAllUserController, userInfoController, userUpdateController,
    loginUserController, logoutUserController} = require('../controllers/userController.js');

const router = express.Router();

router.post('/add', addUserController);
router.get('/', getAllUserController);
router.get('/specific/:id', userInfoController);
router.put('/update/:id', userUpdateController);
router.delete('/delete/:id', userDeleteController);

router.post('/login', loginUserController);
router.get('/logout', logoutUserController);

module.exports = router;