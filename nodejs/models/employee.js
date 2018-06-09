const mongoose = require('mongoose');

let Employee = mongoose.model('Employee', {
    name: { type: String},
    position: { type: String},
    office: { type: String},
    salary: { type: String},
});

module.exports = { 
    Employee 
} ;