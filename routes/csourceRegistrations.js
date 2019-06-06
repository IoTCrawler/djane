/*******************************************************************************
 * Copyright (c) 2019 sensinov (www.sensinov.com)
 * 41 Rue de la découverte, 31676 Labège, France
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Mahdi Ben Alaya (Project co-founder) - Management and initial specification,
 *         design, implementation, test and documentation.
 *     Ghada Gharbi (Project co-founder) - Management and initial specification,
 *         design, implementation, test and documentation.
 * Authors: 
 * 		Ghada Gharbi < ghada.gharbi@sensinov.com >
 ******************************************************************************/

const express = require ('express');
var csRegistrationValidator = require('../models/csourceregistrationModel'); 
var configPath = require ('../config/config'); 
const mongo = require('../lib/mongo'); 
const db=mongo.getdb(); 

const auth = require('../auth/auth'); 
const router = express.Router();


//ContextSources management
router.get(configPath.basePath+'/csourceRegistrations', auth.checkToken, function(req, res) {
	db.collection('csourceRegistrations').find().project({_id:0}).toArray(function (err, result){ 
    		if (err) return console.log(err)
		res.status(200)
    		res.send(result)
  	})
});

router.get(configPath.basePath+'/csourceRegistrations/:csourceRegistrationId', auth.checkToken, function(req, res) {
	db.collection('csourceRegistrations').find({'id': req.params.csourceRegistrationId}).project({_id:0}).toArray(function (err, result){ 
    		if (err) return console.log(err)
		res.status(200)
		res.send(result)
	})
}); 

function  csRegistrationExistsInDB (id, req, res) {
    db.collection('csourceRegistrations').find({'id': id}).toArray(function(err, results) {
        if (results.length > 0) {
            res.status(409); 
            res.send('Resource already exists'); 
        } else {
            db.collection('csourceRegistrations').insertOne(req.body, function (err, result) {
                if (err) {
                    return console.log(err); 
                } else {
                    res.status(201); 
                    res.send({message: '201 Created'}); 
                }
            }); 
        }
    }); 
}

router.post(configPath.basePath+'/csourceRegistrations', auth.checkToken, function (req, res) {
    let verdict = csRegistrationValidator.csourceRegistrationValidator(req.body); 
    if (!verdict.correct) {
        res.status(404); 
        res.send('Invalid Request - wrong content: ' + verdict.errorMsg);
    } else {
        let id=req.body.id;  
        csRegistrationExistsInDB (id, req, res); 
    }
}); 

router.delete(configPath.basePath+'/csourceRegistrations/:csourceRegistrationId', auth.checkToken, function (req, res) {
  	 db.collection('csourceRegistrations').findOneAndDelete({'id': req.params.csourceRegistrationId}, (err, result) => {
    		if (err) return res.send(500, err)
		res.status(204)
    		res.send({message: '204 No Content'})
  	})
});

module.exports = router; 