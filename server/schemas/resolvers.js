const {User, Recipe} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        //find all recipes, may specify username
        recipes: async (parent, {username}) => {
            const params = username ? {username}: {};
            return Recipe.find(params).sort({createdAt: -1});
        },

        //find single recipe with id
        recipe: async (parent, {_id}) => {
            return Recipe.findOne({_id});
        },

        //find all users
        users: async() => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('recipes');
        },

        //find single user
        user: async (parent, {username}) => {
            return User.findOne({username})
                .select('-__v -password')
                .populate('friends')
                .populate('recipes');
        },

        //find the current signed in user
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('friends')
                    .populate('recipes');
                    return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    }
};

module.exports = resolvers;