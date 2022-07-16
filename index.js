const express = require('express');
const app = express();
const videoRoutes = require('./routes/videos');
const cors = require('cors');


app.use(express.json());

app.use(cors());

app.use('/videos', videoRoutes);

app.use(express.static('./public'))


app.listen(8080, () => {
    console.log('server is online!');
});