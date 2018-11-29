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
    'https': {
        'port': 4000,
        'key_path': '../https/key.pem',
        'cert_path': '../https/cert.pem'
    },
    'env_name': 'staging'
}

environments.production = {
    'http_port': 5000,
    'https': {
        'port': 6000,
        'key_path': '../https/key.pem',
        'cert_path': '../https/cert.pem'
    },
    'env_name': 'production',
}

//Selected environment, allowing for capitalization (Just a small Quality of Life change)
var node_env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : environments.default;

//If the environment is a string and is contained in the environments object, return it.
//Otherwise, use the default environment
var chosen = typeof (node_env) == 'string' && typeof (environments[node_env]) == 'object' ? node_env : environments.default;

module.exports = environments[chosen];