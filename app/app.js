import express from 'express';
import path from 'path';
import http from 'http';
import cors from './middlewares/cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import requestTime from './middlewares/requestTime';
import pingRouter from './routes/ping/PingRouter';
import userRouter from './routes/user/UserRouter';
import companyRouter from './routes/company/CompanyRouter';
import sectorRouter from './routes/sector/SectorRouter';
import eventRouter from './routes/event/EventRouter';
var app = express();

const httpServer = http.createServer(app);

// Http server
// Default middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Library middlewares
app.use(cors);

// enable pre-flight request 
// TODO: app.use(cors) might solve this already so might need to check this in the future to see if we need this line
app.options('/', cors);

// Hand-written middlewares
app.use(requestTime)

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

app.use('/ping', pingRouter);
app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/sector', sectorRouter);
app.use('/event', eventRouter);

export default httpServer;
