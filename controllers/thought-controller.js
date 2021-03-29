const { Thought, User } = require("../models")

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought matches this ID.' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Generated thought but no user matches this ID!' })
        }
        res.json({ message: 'Success! Thought created.' })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // when you need update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'Thought doe not exist with this ID.' })
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //remove thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId})
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought exists with this ID.'})
        }
        return User.findOneAndUpdate(
          {thoughts: req.params.thoughtId},
          {$pull: {thoughts: req.params.thoughtId}},
          {new: true}
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user matches this ID.'})
        }
        res.json({ message: 'Thought deleted.'})
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addReaction (req, res) {
    Thought.findOneAndUpdate(
      { _id: req.body.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No thought matches this ID!' })
        }
        res.json({ dbThoughtData})
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  removeReaction (req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No thought matches this ID!' })
        }
        res.json({ dbThoughtData})
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

// module exports

module.exports = thoughtController;