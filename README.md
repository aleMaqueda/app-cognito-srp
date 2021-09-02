app-cognito-srp

Environment

vim .env

```
export CLIENT_ID="clientID"
export USER_POOL_ID="poolID"
```

source .env

Development

`SET DEBUG=express-locallibrary-tutorial:* & npm run devstart
`

Start

`npm start`

Go to:

`http://localhost:3001/users`

References:

https://github.com/aws-amplify/amplify-js/tree/main/packages/amazon-cognito-identity-js

https://github.com/aws-amplify/amplify-js/blob/main/packages/amazon-cognito-identity-js/src/CognitoUser.js#L97