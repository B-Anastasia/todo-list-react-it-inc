const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, (err)=>{
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../build')));
        app.get('*', (req, res)=>{
            req.sendFile(path.resolve(__dirname, '../build', 'index.html'))
        })
    }
    if (err) return console.log(err);
    console.log('Server running on port: ', port);
});