const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const path = require('path');

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.use(express.static(path.join(__dirname, 'build')));


app.get('/react', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
    console.log("express_backend start");
    const jsonContent = JSON.stringify({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    res.end(jsonContent);
//  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11