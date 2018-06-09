const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;


let { Employee } = require('../models/employee');

// localhost:3000/employees/list

router.get('/list', (req , res ) => {
    Employee.find( (err, docs ) => {
        if( !err ) {
            res.send(docs);
        } else {
            console.log(' Error in retreewing Employee: ' + JSON.stringify( err , undefined , 2)) ;
        }
    }); 
});

router.get('/list/:id', (req , res ) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    } else {
        Employee.findById(req.params.id, (err, docs ) => {
            if( !err ) {
                res.send(docs);
            } else {
                console.log(' Error in retreewing Employee: ' + JSON.stringify( err , undefined , 2)) ;
            }
        }); 
    }
    
});

router.put('/list/:id', (req , res ) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    } else {
        let emp = {
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary,
        };
        Employee.findByIdAndUpdate(req.params.id , { $set: emp } , { new: true } , ( err , doc ) => {
            if( !err ) {
                res.send(doc);
            } else {
                console.log(' Error in retreewing Employee: ' + JSON.stringify( err , undefined , 2)) ;
            }
        });
    }
    
});

router.post('/list', ( req , res ) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save( (err , doc ) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log(' Error in retreewing Employee: ' + JSON.stringify( err , undefined , 2)) ;
        }
    });
});

router.delete('/list/:id', (req , res ) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    } else {
        Employee.findByIdAndRemove(req.params.id, (err, docs ) => {
            if( !err ) {
                res.send(docs);
            } else {
                console.log(' Error in retreewing Employee: ' + JSON.stringify( err , undefined , 2)) ;
            }
        }); 
    }
    
});

module.exports = router ;