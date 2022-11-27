const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongoDb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clusterarfan36.opuzllc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appointmentOptionCollection = client.db('doctorsPortal-D-124').collection('appointmentOptions');

        app.get('/appointmentOptions', async (req, res) => {
            const query = {};
            const options = await appointmentOptionCollection.find(query).toArray();
            res.send(options);
        });
    }
    finally {

    }
}

run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Server Running');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
