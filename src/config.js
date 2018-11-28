/*
*   Author: Bryce Collins
*   GitHub Username: TytoCorvus
*
*   Simple Configuration file. Exports the selected configuration based on the specified NODE_ENV
*/

var environments = {};

//This variable allows for a clear, singular location to change the default environment
environments.default = 'staging';

environments.staging = {
    'http_port': 3000,
    'https_port': 4000,
    'env_name': 'staging',
    'key_path': './https/key.pem',
    'cert_path': './https/cert.pem'
}

environments.production = {
    'http_port': 5000,
    'https_port': 6000,
    'env_name': 'production',
    'key_path': './https/key.pem',
    'cert_path': './https/cert.pem'
}

//Selected environment
var node_env = process.env.NODE_ENV;

//If the environment is a string and is contained in the environments object, return it.
//Otherwise, use the default environment
var chosen = typeof (node_env) == 'string' && typeof (environments[node_env]) == 'object' ? node_env : environments.default;

module.exports = environments[chosen];