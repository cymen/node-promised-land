var Promise = require('promise');

var loop = function(count) {
    return new Promise(function(resolve) {
        console.log(count);
        resolve(loop(count + 1));
    });
};

loop(0);
