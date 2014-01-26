# node-promised-land

## looping

### ./looping/finite-promises.js
On my machine, this code repeatably counts up to 3394 (might have seen 3393 once or twice):

    var Q = require('q');

    var loop = function(count) {
        return Q.promise(function(resolve) {
            console.log(count);
            resolve(loop(count + 1));
        });
    };

    loop(0);

### ./looping/infinite-promises.js
This code however blows past 3394 and keeps on going:

    var Q = require('q');

    var loop = function(count) {
        return Q.promise(function(resolve) {
            setTimeout(function() {
                console.log(count);
                resolve(loop(count + 1));
            }, 10);
        });
    };

    loop(0);

My wild guesses for why this might be happening:
* node has an internal "run away" code handler
* some buffer/queue/stack is getting exhausted before cleanup happens
