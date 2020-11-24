const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    if (req.body.userId === 'aaa' && req.body.password === 'aaa') {
        res.send({
            tocken: 'test1233sewefwefewfe',
            userId: 'aaa',
            userName: 'Alex'
        });
    } else {
        res.send({
            error: 'Invalid userId or password'
        });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});