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

function generateGuid() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

app.post('/todos', (req, res) => {
    db.get('todos').push({
        id: generateGuid(),
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    }).write();
    res.send({ result: 'Success' });
});

app.put('/todos', (req, res) => {
    db.get('todos').find({ id: req.body.id }).assign({ title: req.body.title, description: req.body.description, category: req.body.category }).write();
    res.send({ result: 'Success' });
});

app.delete('/todos', (req, res) => {
    console.log('req.body.id', req.query.id);
    db.get('todos').remove({ id: req.query.id }).write();
    res.send({ result: 'Success' });
});

app.get('/todos', (req, res) => {
    if (req.query.category === undefined) {
        res.send(db.get('todos').value());
    } else {
        res.send(db.get('todos').filter({ category: req.query.category }).value());
    }
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