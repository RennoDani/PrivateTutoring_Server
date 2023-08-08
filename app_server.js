const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./Util/database');
const multer = require('multer');

app.use(express.json());

app.use(cors(
  {
    origin: 'http://localhost:4200',
    credentials: true // Isso permite incluir cookies e headers de autenticação na solicitação
  }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, DELETE, OPTIONS");
  next();
});

const contactRoutes = require('./Routes/contactRoute');
const userRoutes = require('./Routes/userRoute');
const authRoutes = require('./Routes/authRoute');
const lessonRoutes = require('./Routes/lessonRoute');



db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Successfully connected the database');
});


///// Middleware - Verify token
console.log('Middleware ');



//// PDF
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'PDF_files');
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

//console.log('app server - pdf - fileStorage: ', fileStorage);

//filepath from [lesson.filepath]
app.use(
  multer({ storage: fileStorage }).single('filepath'),
  express.static((__dirname, '/PDF_files'))
);
//express.static(path.join(__dirname, 'PDF_files'))


// Create the Multer upload instance
//const upload = multer({ storage: fileStorage });

// Route to handle file upload
app.post('/upload', multer({ storage: fileStorage }).single('filepath'), (req, res) => {
  // File has been uploaded and stored in the 'PDF_files' folder
  // Do any further processing if needed and send a response
  res.json({ message: 'File uploaded successfully!' });
});



//// Routes
app.use(userRoutes);
app.use(contactRoutes);
app.use('/auth', authRoutes);
app.use(lessonRoutes);


app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});