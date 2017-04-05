import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

//Init Models and Routes Yo
import game from './app/models/game';
import {getGames, getGame, postGame, deleteGame} from './app/routes/game';

//Init Dat Server, Cheeseface
const app = express();
const port = process.env.PORT || 8080;

//Database for ya face
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000}}
};
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/retrogames');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Body parser and Morgan middlewarez
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Static public folder for the homies
app.use(express.static(__dirname + '/client/dist'));

//Enable CORS to make HTTP request from webpack-dev-server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API Routes
app.route('/games')
  // create a game
  .post(postGame)
  // get all games
  .get(getGames);
app.route('/games/:id')
  // get a single game
  .get(getGame)
  // delete a single game
  .delete(deleteGame);

//All other requst send back to the homepage
app.route("*").get((req, res) => {
  res.sendFile('client/dist/index.html', { root: __dirname });
});

//init PORT
app.listen(port);

console.log(`listening on port ${port}`);
