
import express from "express";
import compression from "compression";

const app = express();

// I want to call this server to mock a response from index.js
const generateNFieldObject = (n) => {
	const nFieldObject = {};
	for (let i = 1; i <= n; i++) {
		nFieldObject[`field${i}`] = `value${i}`;
	}
	console.log(nFieldObject);
	return nFieldObject;
}

// app.use(compression())
app.get('/test/:number', (req, res) => {
	res.json(generateNFieldObject(req.params.number));
});

app.listen(1234, () => {
	console.log('Server is running on http://localhost:1234');
});