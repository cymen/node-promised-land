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

A variant (./looping/finite-promises-variant.js) using promise from npm which gets up to
2729 repeatably:

    var Promise = require('promise');

    var loop = function(count) {
        return new Promise(function(resolve) {
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

As does a variant ('./looping/infinite-promises-variant.js) using promise from npm:

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

My wild guesses for why this might be happening:
* node has an internal "run away" code handler when we consume all the cycles/slices/ticks/?
* some buffer/queue/stack is getting exhausted before cleanup happens
