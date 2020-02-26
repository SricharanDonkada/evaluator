const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const jsonfile = require('jsonfile');
const fs = require('fs');

var eventBus = new events.EventEmitter();


const PORT = 2001;
const app = express();

var testCases = [{ input: 5, output: 'true' }, { input: 4, output: 'false' }];

const {
    c,
    cpp,
    node,
    python,
    java
} = require('compile-run');




app.use(bodyParser.json());
app.use(cors());



//     CODE  FOR  THE  EVALUATOR

app.post('/evaluate', (req, res) => {
    let code = req.body.code;
    let user = req.body.user;
    let question = req.body.question;
    let out = '';
    console.log(req.body);
    c.runSource(code, { stdin: question.cases.input }, (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});


app.post('/save', (req, res) => {
    let user = req.body.user;
    let data = req.body.data;

    let file = './data/accounts/' + user;
    jsonfile.readFile(file + '/data.json', (err, obj) => {
        if (err) console.error(err);
        obj[data.id] = data;
        jsonfile.writeFile(file + '/data.json', obj, (err) => {
            if (err) console.error(err);
            res.end("{'message':'saved'}");
            console.log('data.json written');
        });
    });
    jsonfile.readFile(file + '/overview.json', (err, obj) => {
        if (err) console.error(err);
        obj.answeredQuestions[data.id] = data.id;
        jsonfile.writeFile(file + '/overview.json', obj, (err) => {
            if (err) console.error(err);
            console.log('overview written');
        });
    });
});

app.post('/fetch-question-data', (req, res) => {
    let user = req.body.user.id;
    let questionId = req.body.questionId;
    let path = './data/accounts/' + user;
    jsonfile.readFile(path + '/overview.json', (err, obj) => {
        if (err) console.error(err);
        if (obj.answeredQuestions[questionId] == undefined) {
            jsonfile.readFile('./data/questions/set-1.json', (err, questionObj) => {
                if (err) console.error(err);
                res.end(JSON.stringify(questionObj[questionId]));
            });
        } else {
            jsonfile.readFile(path + '/data.json', (err, responseData) => {
                if (err) console.error(err);
                res.end(JSON.stringify(responseData[questionId]));
            });
        }
    });
});


app.post('/fetch-question-index', (req, res) => {
    jsonfile.readFile('./data/questions/index.json', (err, obj) => {
        if (err) console.error(err);
        res.end(JSON.stringify(obj));
    });
});



//         CODE FOR ADMIN PANNEL


app.post('/fetch-question-data-for-edit', (req, res) => {
    let id = req.body.id;
    console.log(id);
    jsonfile.readFile('./data/questions/set-1.json', (err, obj) => {
        if (err) console.error(err);
        res.end(JSON.stringify(obj[id]));
    });
});

app.post('/save-edited-question', (req, res) => {
    let saveObj = req.body;
    jsonfile.readFile('./data/questions/set-1.json', (err, obj) => {
        if (err) console.error(err);
        obj[saveObj.id] = saveObj;
        jsonfile.writeFile('./data/questions/set-1.json', obj, (err) => {
            if (err) console.error(err);
            res.end(JSON.stringify({ message: 'success' }));
        });
    });
});

app.post('/save-new-question', (req, res) => {
    let level = req.body.level;
    let question = req.body.question;

    jsonfile.readFile('./data/questions/index.json', (err, indexObj) => {
        if (err) console.error(err);
        let newId = indexObj[level].lastId + 1;
        question.id = newId;
        jsonfile.readFile('./data/questions/set-1.json', (err, questionsObj) => {
            if (err) console.error(err);
            questionsObj[newId] = question;
            jsonfile.writeFile('./data/questions/set-1.json', questionsObj, (err) => {
                if (err) console.error(err);
            });
            indexObj[level].questions.push({ id: newId });
            for (let i = 0; i < indexObj.length; i++) {
                indexObj[i].lastId = newId;
            }
            jsonfile.writeFile('./data/questions/index.json', indexObj, (err) => {
                if (err) console.error(err);
                res.end(JSON.stringify({ message: 'success' }));
            });
        });
    });
});

app.post('/add-new-level', (req, res) => {
    let data = req.body;

    jsonfile.readFile('./data/questions/index.json', (err, indexObj) => {
        if (err) console.error(err);
        data.lastId = indexObj[0].lastId;
        indexObj.push(data);
        jsonfile.writeFile('./data/questions/index.json', indexObj, (err) => {
            if (err) console.error(err);
            res.end(JSON.stringify({ message: 'success' }));
        });
    });
});



//         CODE FOR THE ONINE COMPILER



app.post('/run', (req, res) => {
    let code = req.body.code;
    runCode(code);
    eventBus.on('compiled', (data) => {
        res.end(JSON.stringify(data));
    });
});

function runCode(test) {
    let resultPromise = c.runSource(test);
    resultPromise
        .then(result => {
            console.log(result);
            eventBus.emit('compiled', { error: false, result: result });
        })
        .catch(err => {
            console.log('Error:\n' + err);
            eventBus.emit('compiled', { error: true, result: err });
        });
}


app.listen(PORT, () => {
    console.log('server running on port 2001');
});



// ##################### CODEJAM CODE ################################

app.post('/codejam/fetchquestions', (req, res) => {
    jsonfile.readFile('./data/questions/jam1.json', (err, questionObj) => {
        res.send({ questionsObj: questionObj });
        res.end();
    });
});