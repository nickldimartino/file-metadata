var express = require('express');
var cors = require('cors');
require('dotenv').config()
// require multer to upload files and create the middleware name for it
const multer = require('multer');
const upload = multer();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// GET route to upload a single file
// The middleware function upload.single('upfile') uploads a single file and calls it 'upfile'
app.post('/api/fileanalyse', upload.single('upfile'), (req, rsp) => {
  // respond with the name, type, and size of the uploaded file
  rsp.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
