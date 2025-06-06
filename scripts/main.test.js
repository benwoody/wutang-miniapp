const main = require('./main');

test('hello world!', () => {
	expect(main()).toBe('Hello, World!');
});