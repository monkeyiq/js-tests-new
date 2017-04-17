const { expect } = require('chai');
const controlFlow = require('../src/controlFlow');

describe('Control Flow', () => {
    function getPromise({ payload, error }) {
	return async () => {
//	    if( payload === 'payload1' ) throw 'error on payload1';
//	    if( payload === 'payload2' ) throw 'error on payload2';
	    if (error) throw error;
	    return payload;
	};
    }
    function getCb({ payload, error }) {
	return error
            ? (callback) => callback(error, null)
            : (callback) => callback(null, payload);
    }
    it('should resolve the payloads', async () => {
	try {
	    const payload1 = getPromise({ payload: 'payload1' });
	    const cb1 = getCb({
		payload: getPromise({ payload: 'payload2' })(),
	    });
	    const start = new Date();
	    const results = await controlFlow(payload1, cb1);
	    const execTime = new Date() - start;
	    
	    expect(execTime).to.be.above(249);
	    expect(execTime).to.be.below(601);
	    expect(results).to.exist;
	    expect(results.length).to.equal(2);
	    expect(results[0]).to.equal('payload1');
	    expect(results[1]).to.equal('payload2');
	} catch(e) {
	    throw e;
	}
    });
});
