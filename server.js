const {client, syncAndSeed, getSchools, getClass,registerStudent} = require("./db/client");
const express = require("express");
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");
const app = express();
app.use(express.static(__dirname + "/public"));
// const path = require('path');
// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get("/", async(req, res, next) => {
    try {
        const data = await getSchools();
        res.send(postList(data));
    }
    catch(ex){
        console.log(ex);
    }
})

app.post('/', async(req,res,next)=> {
    try{
        const data = await registerStudent(req.body);
        res.send(postDetails(data));
  
    }
    catch(ex) {
        next(ex);
    }
});

app.get("/schools/:id", async(req, res, next) => {
    try {
        const data = await getClass(req.params.id);
        res.send(postDetails(data));
    }
    catch(ex) {
        next(ex);
    }
});

const setUp = async() => {
    try{
        syncAndSeed();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`App listening in port ${PORT}`))
    }
    catch(ex) {
        console.log(ex);
    }
}
setUp();