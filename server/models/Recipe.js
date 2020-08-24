const {Schema, model} = require('mongoose');
const moment = require('moment');
const reviewSchema = require('./Review');

const recipeSchema = new Schema(
    {
        name: {
            type: String,
            required: 'You must name your recipe.',
            minlength: 4,
            maxlength: 100
        },
        description: {
            type: String,
            required: 'You must describe your recipe.',
            minlength: 20,
            maxlength: 250
        },
        ingredients: {
            type: [String],
            required: 'You must include ingredients.',
            minlength: 1,
            maxlength: 500
        },
        steps: {
            type: [String],
            required: 'Please include the steps to make this recipe.',
            minlength: 10,
            maxlength: 3000
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
        reviews: [reviewSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

recipeSchema.virtual('reviewCount').get(function() {
    return this.reviews.length;
});

const Recipe = model('Recipe', recipeSchema);
module.exports = Recipe;