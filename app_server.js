const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./Util/database');

app.use(express.json());

app.use(cors(
  {
    origin: 'http://localhost:4200' // URL do seu aplicativo Angular    
  }));


const contactRoutes = require('./Routes/contactRoute');
const userRoutes = require('./Routes/userRoute');
const authRoutes = require('./Routes/authRoute');

const authCtrl = require('./Controllers/authCtrl');


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Successfully connected the database');
});


app.get('/protected-route', authCtrl.verifyToken, (req, res) => {

  console.log('Middleware - req.user: ',req.user);
  // Access the user information from req.user
  const userId = req.user.userId;
  const username = req.user.username;

  // Perform operations for the protected route
  // Example: Return a response with the user information
  res.json({ userId, username });

});

app.use(userRoutes);
app.use(contactRoutes);
app.use('/auth',authRoutes);


app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});