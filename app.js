const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, (err)=>{
    if (process.NODE_ENV === 'production') {
        app.use(express.static('build'));
        app.get('*', (req, res)=>{
            res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
        })
    }
    if (err) return console.log(err);
    console.log('Server running on port: ', port);
});