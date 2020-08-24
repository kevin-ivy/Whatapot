const {Schema, model} = require ('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },
        password: {
            type: String,
            required: true
        },
        //Set recipes to an array of data from recipeSchema
        recipes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Recipe'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

//set up middleware for password
userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

//compare incoming password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

userSchema.virtual('recipeCount').get(function() {
    return this.recipes.length;
});

const User = model('User', userSchema);
module.exports = User;