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
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('friends')
                    .populate('recipes');
            
                return userData;
            }
        
            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        //log into the platform
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('No user found');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            return {token, user};
        },

        //create a new user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        
        //add a new recipe
        addRecipe: async(parent, args, context) => {
            if (context.user) {
                const recipe = await Recipe.create({...args, username: context.user.username});

                await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {recipes: recipe._id}},
                    {new: true}
                );

                return recipe
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        //add review to recipe
        addReview: async(parent, {recipeId, reviewBody, recommended}, context) => {
            if (context.user) {
                const updatedRecipe = await Recipe.findOneAndUpdate(
                    {_id: recipeId},
                    {$push: {reviews: {reviewBody, recommended, username: context.user.username}}},
                    {new: true, runValidators: true}
                );

                return updatedRecipe;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        addFriend: async(parent, {friendId}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {friends: friendId}},
                    {new: true}
                ).populate('friends');
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;