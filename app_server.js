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


db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Successfully connected the database');
  });


  app.use(contactRoutes);
  app.use(userRoutes);
  
  
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });