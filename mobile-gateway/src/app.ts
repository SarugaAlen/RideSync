import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
const cors = require("@koa/cors");
import userRoutes from './routes/user';
import reservationRoutes from './routes/reservation';
import rideRoutes from './routes/ride';

const app = new Koa();

app.use(cors());
app.use(bodyParser()); 

app.use(userRoutes.routes()).use(userRoutes.allowedMethods());
app.use(reservationRoutes.routes()).use(reservationRoutes.allowedMethods());
app.use(rideRoutes.routes()).use(rideRoutes.allowedMethods());

app.listen(2000, () => {
  console.log('Koa server listening on port 2000');
});