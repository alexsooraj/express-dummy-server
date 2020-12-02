const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const app = express();
const port = 8080;
app.use(cors());
app.use(bodyParser.json());

db.defaults({
    todos: []
}).write();

const data = [
    {
        country: 'US',
        count: 12840951
    },
    {
        country: 'India',
        count: 9222216
    },
    {
        country: 'Brazil',
        count: 6118708
    },
    {
        country: 'France',
        count: 2154097
    },
    {
        country: 'Russia',
        count: 2120836
    },
    {
        country: 'Spain',
        count: 1594844
    },
    {
        country: 'UK',
        count: 1538764
    },
    {
        country: 'Italy',
        count: 1455022
    }
];

app.post('/todos', (req, res) => {
    db.get('todos').push({
        title: req.body.title,
        description: req.body.description
    }).write();
    res.send({ result: 'Success' });
});

app.get('/data', (req, res) => {
    res.send({ data, date: new Date('11-26-2020').getTime() });
});

app.get('/data/:country', (req, res) => {
    setTimeout(() => {
        res.send(data.find(item => item.country.toLocaleLowerCase() === req.params.country.toLocaleLowerCase()));
    }, 1000);
});

app.post('/login', (req, res) => {
    if (req.body.userId === 'aaa' && req.body.password === 'aaa') {
        res.send({
            token: 'test1233sewefwefewfe',
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