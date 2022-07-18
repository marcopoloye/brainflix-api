const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

router.get('/', (req, res) => {
    const videosData = JSON.parse(fs.readFileSync('./data/videos.json'));

    res.json(videosData)
})

router.get('/:videoId', (req, res) => {
    const videoId = req.params.videoId;
    const videosData = JSON.parse(fs.readFileSync('./data/videos.json'));
    const foundVideo = videosData.find(video => video.id === videoId);

    res.status(200).json(foundVideo);
})

router.post('/', (req, res) => {
    const videoUserData = req.body;
    const videosData = JSON.parse(fs.readFileSync('./data/videos.json'));
    const newVideo = {
        id: uuid(),
        title: req.body.title,
        image: 'https://i.imgur.com/FCzEBsK.jpg',
        description: req.body.description,
        channel: 'Michael Jackson',
        comments: [{"name":"Billie Jean","comment":"Very cool indeed","likes":3,"timestamp": Date.now()},{"name":"Annie","comment":"I like this","likes":0,"timestamp": Date.now()}],
        views: '1,354,685',
        likes: '33,756',
        timestamp: Date.now()
    };

    videosData.push(newVideo);

    fs.writeFileSync('./data/videos.json', JSON.stringify(videosData));

    res.json(newVideo);
})

module.exports = router;