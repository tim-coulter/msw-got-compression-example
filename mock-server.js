
import express from "express";
import compression from "compression";

const app = express();

const generateNFieldObject = (n) => {
	const nFieldObject = {};
	for (let i = 1; i <= n; i++) {
		nFieldObject[`field${i}`] = `value${i}`;
	}
	return nFieldObject;
}

app.use(compression())
app.get('/test/:number', (req, res) => {
	console.log(req);
	const body = generateNFieldObject(req.params.number)
	console.log(Object.keys(body).length);
	res.json(body);
});

app.listen(1234, () => {
	console.log('Server is running on http://localhost:1234');
});