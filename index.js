import { setupServer } from 'msw/node';
import got from 'got';

const sendRequests = async (number) => {
	await Promise.all([
			fetch('http://localhost:1234/test/60', {
				method: 'GET',
			}).then(() => console.log(`fetch works ${number}`)),
			got.get('http://localhost:1234/test/60').then(() => console.log(`got works ${number}`))
		]
	)
	console.log('everything works')
}

const example = async () => {
	await sendRequests(1);
	console.log('first test done, starting mock server');
	// not intercepting any requests
	const server = setupServer();
	server.listen();
	await sendRequests(2);
	console.log('second test done');
}

example();