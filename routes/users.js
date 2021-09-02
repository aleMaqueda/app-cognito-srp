
var express = require('express');
require('cross-fetch/polyfill');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var router = express.Router();
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;


/* GET users listing. */
var authenticateUser = function(req, res, next) {
    
  var authenticationData = {
    Username: req.body.username,
    Password: req.body.password,
  };
  
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData);
  var poolData = {
    UserPoolId: userPoolId, // Your user pool id here
    ClientId: clientId, // Your client id here
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
  var userData = {
    Username: authenticationData.Username,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  var sessionUserAttributes;
  
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      console.log(result);
      var accessToken = result.getAccessToken().getJwtToken();
      res.send("Authentication Success <br/> accessToken: <br/>"+accessToken);
    }, onFailure: function(err) {
      console.log(err, err.stack);
      res.send("failure: <br/>"+err.message);
    },
    newPasswordRequired: function(userAttributes, requiredAttributes) {
      // User was signed up by an admin and must provide new
      // password and required attributes, if any, to complete
      // authentication.

      // the api doesn't accept this field back
      delete userAttributes.email_verified;

      // store userAttributes on global variable
      sessionUserAttributes = userAttributes;
      
      console.log(sessionUserAttributes)
      
      cognitoUser.completeNewPasswordChallenge(req.body.newpassword, sessionUserAttributes, {
        onSuccess: result => {
          console.log(result);
          var accessToken = result.getAccessToken().getJwtToken();
          res.send("Password updated <br/> accesstoken: <br/>"+accessToken);
        },
        onFailure : err => {
          console.log(err, err.stack);
          res.send("failure: <br/>"+err.message);
        }
      });
    }
  });  
}
router.get('/', function(req, res){
  res.render('edit-user', { title: 'amazon-cognito-identity-js' });
});
router.post('/', authenticateUser);
module.exports = router;
