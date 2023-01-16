const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const app = express();
const router = express.Router();
const { v4: uuid } = require('uuid');

app.use('/', router);

router.get('/home', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const videosData = JSON.parse(fs.readFileSync('./data/videos.json'));

    res.json(videosData)
})

router.get('/home/:videoId', (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    const videoId = req.params.videoId;
    const videosData = JSON.parse(fs.readFileSync('./data/videos.json'));
    const foundVideo = videosData.find(video => video.id === videoId);

    res.status(200).json(foundVideo);
})

router.post('/home', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
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

router.post('/:videoId', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const videoId = req.params.videoId;
    const videosData = JSON.parse(fs.readFileSync('./data/videos.json'));
    const foundVideo = videosData.find(video => video.id === videoId);
    const foundComments = foundVideo.comments
    
    const newComment = {
        name: "Michael Jackson", comment: req.body.comment, likes: 0, timestamp: Date.now()
    };

    foundComments.push(newComment)
    
    fs.writeFileSync('./data/videos.json', JSON.stringify(videosData));
    
    res.json(newComment);
})

module.exports = app;
module.exports.handler = serverless(app);