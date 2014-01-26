var Promise = require('promise');

var loop = function(count) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log(count);
            resolve(loop(count + 1));
        }, 10);
    });
};

loop(0);
