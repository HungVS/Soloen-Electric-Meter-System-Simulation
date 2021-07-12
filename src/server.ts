import express from 'express';
import { Main } from './process';
// var apiResponse = require('express-api-response');
// rest of the code remains same
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.get('/api/test', (req, res) => {
  res.json({ message: 'I am a message from Server!'});
})
// app.post('/api/graph', (req, res) => {
//   console.log(req.body.firstName);
//   res.send(req)
// })
app.post('/api/graph',(req, res) => {
  // console.log(req.body.firstName);
   const solution =  Main(req.body.Adjentlist,req.body.NodeList)
  res.json({solution : solution  , message :"Send Graph Success ******"})
    
  // res.json({Adjentlist : req.body.Adjentlist, NodeList : req.body.NodeList})
  // res.send('Send Graph Success ******')
  //  const json =Object.assign({}, solution);;
  // console.log(solution)
})
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});