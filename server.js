import express from 'express';
import { urlencoded, json } from 'body-parser';
import cookieParser from 'cookie-parser';
import { sendEmail } from './mail';


// const { sendEmail } = require('./mail');
const app = express();
const port = process.env.PORT || 5000;


//Data parsing
// app.use(express.urlencoded({
//   extended: false
// }));
// app.use(express.json());

app.use(urlencoded({ extended: true}));
app.use(json());
app.use(cookieParser());


app.post('/api/orderEmail', (req, res, next) => {
  //TODO
  // console.log('Backend breakpoint');
  console.log(req.body);
  let orderDetails = req.body;
  sendEmail(orderDetails, "thanks");
  console.log("sendmail breakpoint");
  next();
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
