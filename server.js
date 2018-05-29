const express = require('express'),
    multer  = require('multer'),
    path = require('path'),
    fs = require('fs');

// Server code
const app = express();
const port = process.env.PORT || 5000;

//A hello world to see the server up and running
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// Upload route
var upload = multer({ dest: './uploads/' });

app.post('/upload', upload, function(req, res){
  res.status(204).end();
});

//Download route
app.get('/download', function(req, res){
  const filesArray = fs.readdirSync(__dirname + '/uploads/');

  var file = './uploads/' + filesArray[0];
  res.download(file); // Set disposition and send it
  fs.unlink(file); //As a workaround, file will be removed after downloading
});