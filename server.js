const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.cookie('test', 'foo');
    res.send('{"fake":"response"}');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

