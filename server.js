const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y7q1wmj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const database = client.db('portfolio_db');
    const contactCollection = database.collection('contact');

    // Post Contact Information
    app.post('/contact', async (req, res) => {
      const contact = req.body;
      const result = await contactCollection.insertOne(contact);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Portfolio Backend Server is Running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});