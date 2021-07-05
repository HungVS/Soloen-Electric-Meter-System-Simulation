import express from 'express';
import { Main } from './process';
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
   Main(req.body.Adjentlist,req.body.NodeList,req.body.IndexNode)
  // res.json({Adjentlist : req.body.Adjentlist, NodeList : req.body.NodeList})
  res.send('Send Graph Success ******')
})
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});