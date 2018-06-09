const mongoose = require('mongoose');

before( function(done) {

    mongoose.connect('mongodb://localhost/test' , ( err ) => {
    if (!err) {
        console.log('DB connected');
        done();
    } else {
        console.log(' error in connecting : ' + JSON.stringify( err , undefined , 2));
    }

});

});
