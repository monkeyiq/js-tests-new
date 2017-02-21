const { expect } = require('chai');
const controlFlow = require('../src/controlFlow');

describe('Control Flow', () => {
  function getPromise({ payload, error }) {
    return async () => {
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
    const payload1 = getPromise({ payload: 'payload1' });
    const cb1 = getCb({
      payload: getPromise({ payload: 'payload2' })(),
    });
    const start = new Date();
    const results = await new Promise((resolve, reject) => {
      const done = (err, _results) => {
        if (err) return reject(err);
        return resolve(_results);
      };
      const returnValue = controlFlow(payload1, cb1, done);
      if (returnValue && returnValue.then) {
        return resolve(returnValue);
      }
      return null;
    });
    const execTime = new Date() - start;
    expect(execTime).to.be.above(249);
    expect(execTime).to.be.below(301);
    expect(results).to.exist;
    expect(results.length).to.equal(2);
    expect(results[0]).to.equal('payload1');
    expect(results[1]).to.equal('payload2');
  });
});
