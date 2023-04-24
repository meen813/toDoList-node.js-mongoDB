const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs')

var db;
MongoClient.connect('mongodb+srv://root:root@clusterapril.s1x2azi.mongodb.net/?retryWrites=true&w=majority', function(error, client){
    if(error) return console.log(error)

    db = client.db('todoapp')

    // db.collection('post').insertOne({name: 'Ian Hwang', age : 30, _id : 100}, function(error, res){
    //     console.log('save success')
    // });

    app.listen(8080, function(){
        console.log('listening on 8080')
    });
})

app.get('/pet', (req, res) => {
    res.send('Hi this is pets')
})

app.get('/beauty', (req, res) => {
    res.send('뷰티용품사세요')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html')
});


app.post('/add', function(req, res){
    res.send('transmission complete');
    console.log(req.body.date);
    console.log(req.body.title);
    db.collection('post').insertOne({title: req.body.title, date : req.body.date}, function(error, res){
        console.log('save success')
    });
})

// 서버에서 .html 말고 .ejs 파일 보내주는 방법
app.get('/list', (req, res) => {

    // db 에 저장된 post 라는 collection 안의 모든 데이터를 꺼내주세요
    db.collection('post').find().toArray(function(error, res){
        console.log(res)
    })
    // 위에서 찾은 데이터를 ejs 파일로 넣어주세요
    res.render('list.ejs', {posts : res})
});