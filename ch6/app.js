var express = require('express');
var open = require('open');
const { spawn } = require('child_process');
var axios = require('axios');
var querystring = require('querystring');

var app = express();
app.use(express.static('callback'));

var KC_URL = process.env.KC_URL || "http://localhost:8080";

var server = app.listen(8000);
var port = server.address().port;

console.info('Listening on port: ' + port + '\n');

var authzRequest = 
    KC_URL + "/realms/myrealm/protocol/openid-connect/auth" +
    "?client_id=cli" +
    "&redirect_uri=http://127.0.0.1: " + port + "/callback" +
    "&response_type=code";

app.get('/', (req, res) => {
    const loginPage = `
        <style>
          button {
            border-radius: 20px;
            padding: 10px 30px;
            cursor: pointer;
            background: linear-gradient(to right, #007bff, #00c9ff);
            color: #fff;
            border: none;
          }
        </style>
        <button onclick="login()">Login</button>
        <script>
          function login() {
             window.open("${authzRequest}");
          }
        </script>
    `;
    res.send(loginPage);
  });

app.get('/callback/', function(req, res) {
    res.send('<html><script>window.close();</script><body>Completed, please close this tab</body></html>');
    var code = req.query.code;
    server.close();

    console.info('Authorization Code: ' + code + '\n');

    axios.post(`${KC_URL}/realms/myrealm/protocol/openid-connect/token`, querystring.stringify({
        client_id: 'cli',
        grant_type: 'authorization_code',
        redirect_uri: 'http://127.0.0.1:' + port + '/callback',
        code: code
    })).then(res => {
        console.log('Access Token: ' + res.data.access_token + '\n');
    }).catch(error => {
        console.error(error);
    });
});


openUrl(authzRequest)

async function openUrl(url) {
    try {
      // Trigger the default browser to open the URL, if it is available.  
      await open(url);
    } catch (error) {
      console.error(`Failed to open ${url}: ${error.message}`);
    }
}
