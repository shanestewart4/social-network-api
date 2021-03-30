const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You must leave a thought.',
            minLength: 1,
            maxLength: 300
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

// module exports

module.exports = Thought;