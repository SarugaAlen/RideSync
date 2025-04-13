import Router from 'koa-router';
import RideServiceClient from '../client/client'; // Import the gRPC client

const router = new Router({
  prefix: '/rides', 
});

const grpcCall = (method: Function, request: any) =>
  new Promise((resolve, reject) => {
    method(request, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
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

export default router;