const {Schema} = require('mongoose');
const moment = require('moment');

const reviewSchema = new Schema(
    {
        reviewBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
        },
        recommended: {
            type: Boolean,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = reviewSchema;