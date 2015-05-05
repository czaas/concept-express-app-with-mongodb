var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res){
	res.render('helloworld', { title: 'Hello world' });
});

router.get('/userlist', function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e, docs){
		res.render('userlist', {
			"userlist": docs,
			"title": 'My userlist'
		});
	});
});

router.get('/newuser', function(req, res){
	res.render('newuser', { title: 'Add New User' });
});


// Posting to Add User Service
router.post('/adduser', function(req, res){

	//set internal db variable
	var db = req.db;

	// Get our form values. 
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	// set our collection
		//or asign the information location ex: db.usercollections.ADD-METHOD-HERE
		// collection variable is: 
			//req.db == ./../app.js  which is:
				//db monk="localhost:27017/nodetest2".usercollection.ADD-METHOD-HERE 
	var collection = db.get('usercollection')

	collection.insert({
		"username": userName,
		"email": userEmail
	}, function(err, doc){
		if (err){
			// it failed; return error
			res.send('There was a problem adding the info to the database');
		} else {
			// if it worked, set the header so the address bar doesn't say add user
				//redirect? Nope.
			res.location('userlist');
			// And forward to the success page
			res.redirect('userlist');
		}
	})

});

module.exports = router;
