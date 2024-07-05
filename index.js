import got from "got";

console.log('Hello, World!');


import { setupServer } from 'msw/node';
import {http, passthrough} from "msw";


const setupMockServer = () => {
	const server = setupServer();
	// server.use(http.get('*', () => passthrough()))
	server.events.on('response:bypass', ({request: _request}) => {
		console.warn(`bypass ${_request.url}`);
	});

	server.events.on('unhandledException', ({request: _request}) => {
		console.warn(`unhandled ${_request.url}`);
	});

	server.events.on('request:end', ({request: _request}) => {
		// console.warn(`end123: ${_request.url}`);
	});
	server.listen({onUnhandledRequest: 'bypass'});
}
setupMockServer();

const testTwoRequests = async () => {
	for (let i = 0; i < 100; i++) {
		await got.get('http://localhost:1234/test/1000');
		console.log('done', i)
	}
}
console.log('start')
testTwoRequests().then(() => {
	console.log('done')
}).catch((err) => {
	console.error('err', err)
})