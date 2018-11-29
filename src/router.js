/*
*   Author: Bryce Collins
*   GitHub Username: TytoCorvus
*   
*   This router is very simple - it allows for get and post requests to the /hello directory
*   If you post and have a name in the body, it will remember and say how many times you have visited
*/

//The parent object we will be exporting
var router = {};

//Simple function to be called whenever we cannot find a route
router.not_found = function (data, callback) {
    callback(404);
};

//Keeps track of the people who have said hello!
var met = {};

//This function decides whether to call the get or the post function based on the method
router.hello = function (data, callback) {
    switch (data.method) {
        case 'get':
            callback(200, get_hello());
            break;
        case 'post':
            callback(200, post_hello(data.payload));
            break;
        default:
            callback(404);
            break;
    }
};

// Always returns the same object
function get_hello() {
    return { message: "Why, hello there! Nice to meet you!" };
};

//Changes in functionality based on the data passed
function post_hello(post_data) {
    var data = JSON.parse(post_data);
    var message = {};

    if (!data || !data.name) {
        return get_hello();
    }

    if (!met[data.name]) {
        met[data.name] = 1;
        message.message = `Hello there, ${data.name}! I don't believe we have met before!`;
        return message;
    }
    else {
        message.message = `Hello again, ${data.name}! We have met ${met[data.name]++} times before.`;
        return message;
    }
};


module.exports = router;