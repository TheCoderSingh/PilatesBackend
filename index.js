require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Vimeo = require("vimeo").Vimeo;
const client = new Vimeo(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.ACCESS_TOKEN
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// app.get("/videos", (req, res) => {
// 	client.request(
// 		{
// 			method: "GET",
// 			path: "/me/videos?per_page=100",
// 		},
// 		(error, body, status_code, headers) => {
// 			if (error) {
// 				console.log(error);
// 			}

// 			res.send(body.data);
// 		}
// 	);
// });

app.get("/search-videos/:query", (req, res) => {
	client.request(
		{
			method: "GET",
			path: `/me/videos?query=${req.params.query}`,
		},
		(error, body) => {
			if (error) {
				console.log(error);
			}

			res.send(body.data);
		}
	);
});

app.get("/video/:id", (req, res) => {
	client.request(
		{
			method: "GET",
			path: `/me/videos/${req.params.id}`,
		},
		(error, body) => {
			if (error) {
				console.log(error);
			}

			// let x = body.data.json();
			res.send(body);
		}
	);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
