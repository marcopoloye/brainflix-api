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

    console.log(foundVideo)

    res.status(200).json(foundVideo);
})

router.post('/', (req, res) => {
    const videoUserData = req.body;
    console.log(videoUserData);

    const videosData = JSON.parse(fs.readFileSync('./data/videos.json'));

    const newVideo = {
        id: uuid(),
        title: req.body.title,
        image: 'https://i.imgur.com/FCzEBsK.jpg',
        description: req.body.description
    };

    videosData.push(newVideo);

    fs.writeFileSync('./data/videos.json', JSON.stringify(videosData));

    res.json(newVideo);
})

module.exports = router;