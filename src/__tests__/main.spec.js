'use strict';

const { hello } = require('../main');

describe('hello', () => {
  test('say hello', () => {
    expect(hello()).toMatchInlineSnapshot(`"hello"`);
  });
});
