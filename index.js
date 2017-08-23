const express = require('express');
const mustache = require('mustache');
const fs = require('fs');


let app = express();
app.get("/", function(req, resp) {
    resp.render('index', {
        name: 'hayet',
        adjective: "hungry"
    });
});


app.get("/test", function(req, resp) {
    let str = mustache.render("hello {{name}}!!!yoo are awesome!", {
        name: "Louis"
    })
    resp.send(str)

});
app.engine("html", function(path, options, calback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            console.error("faill to open template:", err);
            return calback(err);
        }
        let str = mustache.render(content, options);
        return calback(null, str);
    })
});

app.set('views', './template'); // specify the views directory
app.set('view engine', 'html'); // register the template engine
app.use(express.static("public"));

app.listen(80, "localhost", function() {
    console.log("Serveur web lancé sur localhost:80 ...");
});