const {User, Thought} = require('../models');

const userControllers = {
    // get request for all users
    getUsers( req, res) {
        User.find()
            .select('-__v')
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // get request for one user by ID
    getSingleUser(req, res) {
        User.findOne({id: req.params.userId})
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({message: 'User not found with this ID.'})
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // create new user
    createUser( req, res) {
        User.create(req.body)
            .then((dbUserData) => {
                res.json(dbUserData)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // update existing user
    updateUser( req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set:req.body},
            {
                runValidators:true,
                new: true
            }
        )
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(404).json({message: 'No user matches this ID.'})
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteUser( req, res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({message: 'No user matches this ID.'})
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // add friend to the friends list
    addFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {new: true})
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({message: 'No user matches this ID.'});
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // remove a friend from your friend's list
    removeFriend(req, res) {
        User.findOneAndDelete({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true})
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({message: 'No user matches this ID.'});
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
}

module.exports = userControllers;