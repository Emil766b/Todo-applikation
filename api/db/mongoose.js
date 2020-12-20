// This file handls connection logic to MongoDB

const mongoose = require('mongoose');
// Changes mongoose to global promise instead of blue bird promise
mongoose.Promise = global.Promise;
// Databse connectiong sting and error checking
mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to todoDB");
}).catch((e) => {
    console.log("Error connecting to todoDB");
    console.log(e);
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// Prevents deprecation errors
module.exports = {
    mongoose
};