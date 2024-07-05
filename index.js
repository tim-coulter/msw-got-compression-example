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
	server.listen();
}
setupMockServer();

const testNFieldRequest = async (n) => {
	for (let i = 0; i < 100; i++) {
		await got.get(`http://localhost:1234/test/${n}`);
		console.log('done', i)
	}
}
console.log('start')
testNFieldRequest(1000).then(() => {
	console.log('done all')
}).catch((err) => {
	console.error('err', err)
})