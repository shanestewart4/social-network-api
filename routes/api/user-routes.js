const router = require('express').Router();
const {
    getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend
} = require('../../controllers/user-controller');

// route to /api/users
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// module exports

module.exports = router;