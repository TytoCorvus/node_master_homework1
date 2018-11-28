/*
*   Author: Bryce Collins
*   GitHub Username: TytoCorvus
*   
*   Created for the purposes of the Pirple Node.js Master Class
*   This server will accept http and https GET and POST requests to the /hello directory
*   POST requests will allow parameters that will personalize the response message
*/

const http = require('http');
const https = require('https');
const url = require('url');

const config = require('./config.js');

console.log(config);


