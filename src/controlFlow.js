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

//import Promise from 'bluebird';
const { expect } = require('chai');

// This function merely waits 250ms and completes with: [ payload1, payload2 ]
module.exports = function (getPromisedPayload, nodeStyleCallback, done) {
    
    return new Promise((resolve, reject) => {
	try {
	    setTimeout(function () {
		nodeStyleCallback(async function (err, unresolvedPromisePayload) {
		    if (err) { console.log('native func err'); return reject(err); }
		    try {
		    	var tasks   = [ getPromisedPayload(), unresolvedPromisePayload ];
		    	var results = await Promise.all( tasks );
		    	resolve( results );
		    } catch(e) {
		    	reject(e);
		    }
		});
	    }, 250 );
	} catch(e) {
	    reject(e);
	}
    });

};
