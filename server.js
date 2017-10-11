let express = require("express");
let app = express();
let path = require("path");
let fs = require("fs");

let people = fs.readFileSync("js/data.json");
let log = "log.txt"

people = JSON.parse(people);

app.use("/", express.static(path.join(__dirname)))

app.post("/test", function(req, res) {
    req.on("data", function(arr) {
        people = JSON.parse(arr);

        fs.writeFile("js/data.json", JSON.stringify(people), function(err) {
            if (err) throw err;
            console.log("write data file");
        })
    })
    res.send(people);
})

app.post("/send", function(req, res) {
    req.on("data", function(chunk) {
        people.push(JSON.parse(chunk));

        fs.writeFile("js/data.json", JSON.stringify(people), function(err) {
            if (err) throw err;
            console.log("data recorded");
        })

        let logger = "address: " + req.ip + " time: " + Date()+" data: " + chunk + "\n";

        fs.appendFile(log, logger, function(err) {
            if (err) throw err;
            console.log("log recorder");
        })
    })
})

app.listen("8080", function() {
    console.log("server is started on port 8080")
});