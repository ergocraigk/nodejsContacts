var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world page. */
router.get('/hello', function(req, res, next) {
  res.render('helloworld', { title: 'Hello World' });
});

/* GET login page page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

/* GET login page page. */
//router.post('/login', function(req, res) {
//  res.render('contacts', { title: 'Contacts Page' });
//});

/* GET contacts form page. */
router.get('/cform', function(req, res, next) {
  res.render('cform', { title: 'Contacts Form' });
});

router.get('/edit', function(req, res, next) {
  var id = req.param('_id');
  res.render('edit', { title: 'Edit Contact', id: id});
});

/* GET contact submission/goodbad page. */
router.get('/goodbad', function(req, res, next) {
  res.render('goodbad', { title: '' });
});

/* GET contacts page. */
router.get('/contacts', function(req, res, next) {
  var db = req.db;
  var collection = db.get('dbContacts');
  collection.find({},{},function(e, docs){
    res.render('contacts',{
               "contacts":docs
               });
  });
  //res.render('contacts', { title: 'Contact List' });
});

router.post('/cform', function(req, res){
  //validation for the form
  var errors = 0;
  
      //get our form values. These rely on the "name" attributes if they meet validation
      //if (req.body.firstname ) {
        //code
      //}
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var company = req.body.company;
      var jobTitle = req.body.jobTitle;
      var email = req.body.email;
      var phone = req.body.phone;
      var dateMet = req.body.dateMet;
      var whereMet = req.body.whereMet;
      var notes = req.body.notes;
  
    if (errors === 0) {

      //set our internal DB variable
      var db = req.db;
      
      //set our collection
      var collection = db.get('dbContacts');
      
      //submit to the DB
      collection.insert({
        "firstname" : firstname,
        "lastname" : lastname,
        "company" : company,
        "jobTitle" : jobTitle,
        "email" : email,
        "phone" : phone,
        "dateMet" : dateMet,
        "whereMet" : whereMet,
        "notes" : notes
      },function (err, doc){
        if (err) {
          // if it failed, return error
          res.send("There was a problem adding the information to the database.");
        }
        else{
          //if it worked, set the header so the address bar doesn't say /adduser
          res.location("goodbad");
          //and forward to success page
          res.redirect("goodbad");
        }
      });
    }
});

module.exports = router;
