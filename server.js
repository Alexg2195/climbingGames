var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/icons", express.static(__dirname + "/icons"));
app.use("/sound", express.static(__dirname + "/sound"));
app.use("/fonts", express.static(__dirname + "/fonts"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/index.html");
});

app.listen(PORT, function() {
  console.log("Listening on port %s" , PORT);
});
