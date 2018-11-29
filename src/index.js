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
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;
const url = require('url');

const config = require('./config.js');
const router = require('./router.js');

var http_server = http.createServer(function (req, res) {
    unified_server(req, res);
});

//Abstracting the https server options to the config file
var https_options = {
    'key': fs.readFileSync(config.https.key_path),
    'cert': fs.readFileSync(config.https.cert_path)
}
var https_server = https.createServer(https_options, function (req, res) {
    unified_server(req, res);
});

//Handles the requests sent to the HTTP and HTTPS servers
var unified_server = function (req, res) {

    //Parse the URL
    var parsed_url = url.parse(req.url, true);

    //Path request
    var path = parsed_url.pathname;
    //This RegEx removes the leading and trailing slashes
    var trimmed_path = path.replace(/^\/+|\/+$/g, '');

    //Turning the path into an array is probably unneccesary until an API gets larger
    //Just doing it now to build the habit, shifting the path array will allow for easy routing.
    var path_array = trimmed_path.split('/');

    // Get the query string as an object
    var query_string_object = parsed_url.query;

    // Get the HTTP Method
    var method = req.method.toLowerCase();

    // Get the headers
    var hdrs = req.headers;

    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data', function (data) {
        buffer += decoder.write(data);
    })

    req.on('end', function () {
        buffer += decoder.end();

        var data = {
            'url': parsed_url,
            'path': trimmed_path,
            'method': method,
            'query': query_string_object,
            'headers': hdrs,
            'payload': buffer
        };

        // Choose the handler this request should go to. If one is not found, use the not found handler
        var chosen_handler = typeof (router[trimmed_path]) !== 'undefined' ? router[trimmed_path] : router.not_found;

        chosen_handler(data, function (status_code, payload) {
            //If the status code is not of a valid type, set it to 200
            status_code = typeof (status_code) == 'number' ? status_code : 200;

            // Use the payload called back by the handler or default to an empty object
            payload = typeof (payload) == 'object' ? payload : {};

            //Convert the payload to a string
            var payload_string = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(status_code);
            res.end(payload_string);

            //Sends the returning object out to the console
            console.log("returning " + payload_string);
        });

    });

}

http_server.listen(config.http_port, function () {
    console.log(`The HTTP server is alive on port ${config.http_port}`);
})

https_server.listen(config.https.port, function () {
    console.log(`The HTTPS server is alive on port ${config.https.port}`);
});







