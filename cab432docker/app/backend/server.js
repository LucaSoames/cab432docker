//API KEYS
// SEC d9eee3f9665205abbe039e65fc6c13f3eaaa473b3038541789e2024cf27e552b
// financial modeling prep 71bba0c6a73bfc92ec7e32ffb005711d 
// ProPublica https://api.propublica.org/congress/{version}/ pXoibU9uDKjwERfiN1XH2mQinedjX4NtuBvtZgii https://projects.propublica.org/api-docs/congress-api/
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const controller = require('./controller'); // Import your controller

app.use('/', controller); // Use the controller for the route

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

