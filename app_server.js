const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./Util/database');
const multer = require('multer');
const path = require('path');

app.use(express.json());

app.use(cors(
  {
    origin: 'http://localhost:4200' // URL do seu aplicativo Angular    
  }));


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

// const authCtrl = require('./Controllers/authCtrl');
// app.get('/protected-route', authCtrl.verifyToken, (req, res) => {

//   console.log('Middleware - req.user: ', req.user);
//   // Access the user information from req.user
//   const userId = req.user.userId;
//   const username = req.user.username;

//   // Perform operations for the protected route
//   // Example: Return a response with the user information
//   res.json({ userId, username });

// });


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