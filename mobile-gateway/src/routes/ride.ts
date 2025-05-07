import Router from 'koa-router';
import RideServiceClient from '../client/client';
import axios from 'axios';
import grpcCall from '../utils/grpCall';

const router = new Router({
  prefix: '/rides', 
});


router.post('/', async (ctx) => {
  try {
    const response = await grpcCall(RideServiceClient.CreateRide.bind(RideServiceClient), ctx.request.body);
    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
});

router.get('/:id', async (ctx) => {
  try {
    const response = await grpcCall(RideServiceClient.GetRide.bind(RideServiceClient), { ride_id: ctx.params.id });
    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { 
      message: 'Internal Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
});

router.get('/', async (ctx) => {
  try {
    const response = await grpcCall(RideServiceClient.ListRides.bind(RideServiceClient), ctx.query);
    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { 
      message: 'Internal Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
});

router.put('/:id', async (ctx) => {
  try {
    const response = await grpcCall(RideServiceClient.UpdateRide.bind(RideServiceClient), {
      ...(typeof ctx.request.body === 'object' && ctx.request.body !== null ? ctx.request.body : {}),
      ride_id: ctx.params.id,
    });
    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { 
      message: 'Internal Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
});

router.delete('/:id', async (ctx) => {
  try {
    const response = await grpcCall(RideServiceClient.DeleteRide.bind(RideServiceClient), { ride_id: ctx.params.id });
    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { 
      message: 'Internal Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
});

router.get('/location', async (ctx) => {
  try {
    const response = await grpcCall(RideServiceClient.FindRidesByLocation.bind(RideServiceClient), ctx.query);
    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { 
      message: 'Internal Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
});

router.get('/:id/details', async (ctx) => {
  try {
    const ride = await grpcCall(RideServiceClient.GetRide.bind(RideServiceClient), {
      ride_id: ctx.params.id,
    });

    const reservationRes = await axios.get(`http://localhost:4000/reservations/ride/${ctx.params.id}`);

    ctx.status = 200;
    ctx.body = {
      ride,
      reservation: reservationRes.data,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: 'Failed to fetch ride details',
      error: error instanceof Error ? error.message: 'Unknown error',
    };
  }
});

export default router;