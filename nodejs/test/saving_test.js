const mocha = require('mocha');
const assert = require('assert');

let { marioChar } = require('../models/marioChar');

 describe('saving records' , function() {

    it('saves records to database' , function(done) {

        let char = new marioChar( {
            name: 'Mario'
        });  

        char.save().then( function() {
            assert(char.isNew === false );
            done();
        });

        });
 });