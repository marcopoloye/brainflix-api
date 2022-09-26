const express = require('express');
const app = express();
const videoRoutes = require('./routes/videos');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.use('/videos', videoRoutes);

app.use(express.static('./public'))

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
 });