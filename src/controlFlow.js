/**
 *  OBJECTIVES:
 *
 *  This code already passes the test, your goal is to:
 *
 *  - Convert this code to use Async/Await control flow.
 *    Guide: https://ponyfoo.com/articles/understanding-javascript-async-await
 *
 *  - The function can be completed with EITHER:
 *    - Calling the `done` node-style callback, as below
 *    - (preferred) returning a promise
 *
 *  BONUS POINTS:
 *  - Utilize ES6 syntax
 *  - Have no lint errors
 */

// import Promise from 'bluebird';

// This function merely waits 250ms and completes with: [ payload1, payload2 ]
module.exports = function (getPromisedPayload, nodeStyleCallback, done) {
  const results = [];

  setTimeout(function () {
    getPromisedPayload().then(function (payload) {
      results.push(payload);

      nodeStyleCallback(function (err, unresolvedPromisePayload) {
        if (err) return done(err);

        unresolvedPromisePayload.then(function (payload2) {
          results.push(payload2);

          done(null, results);
        }).catch(function (_err) {
          done(_err);
        });
      });
    }).catch(function (err) {
      done(err);
    });
  }, 250);
};
