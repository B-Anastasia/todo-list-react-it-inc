const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

app.listen(port, (err)=>{
    if (err) return console.log(err);
    console.log('Server running on port: ', port);
});