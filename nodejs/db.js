const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB' , (err) => {
    if (!err) {
        console.log('DB connected');
    } else {
        console.log('error in connecting DB' + JSON.stringify(err, undefined , 2));
    }
});

module.exports = mongoose ;