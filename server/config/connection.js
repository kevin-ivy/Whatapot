const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/whatapot', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });

    
const connection = 'mongodb+srv://user:utabootcamp@whatapot.9j2md.mongodb.net/<dbname>?retryWrites=true&w=majority'
//utabootcamp

mongoose.connect(connection, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false })
        .then(() => console.log("Database Connected Successfully"))
        .catch(err => console.log(err));

// mongoose.connect(MONGODB_URI || 'mongodb://localhost/whatpot', { 
//     useNewUrlParser: true,
//     useUnifiedTopology:  true
//  });

module.exports = mongoose.connection;
