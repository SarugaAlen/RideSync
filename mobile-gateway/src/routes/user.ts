import Router from 'koa-router';
import axios from 'axios';
import RideServiceClient from '../client/client';
import grpcCall from '../utils/grpCall';

const router = new Router({
  prefix: '/users', 
});

const userServiceBaseUrl = 'http://localhost:5000/users';

router.post('/register', async (ctx) => {
  try {
    const response = await axios.post(`${userServiceBaseUrl}/register`, ctx.request.body);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      ctx.status = error.response.status;
      ctx.body = error.response.data;
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal Server Error' };
    }
  }
});

router.get('/', async (ctx) => {
  try {
    const response = await axios.get(userServiceBaseUrl);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      ctx.status = error.response.status;
      ctx.body = error.response.data;
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal Server Error' };
    }
  }
});

router.get('/:id', async (ctx) => {
  try {
    const response = await axios.get(`${userServiceBaseUrl}/${ctx.params.id}`);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      ctx.status = error.response.status;
      ctx.body = error.response.data;
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal Server Error' };
    }
  }
});

router.put('/:id', async (ctx) => {
  try {
    const response = await axios.put(`${userServiceBaseUrl}/${ctx.params.id}`, ctx.request.body);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      ctx.status = error.response.status;
      ctx.body = error.response.data;
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal Server Error' };
    }
  }
});

router.delete('/:id', async (ctx) => {
  try {
    const response = await axios.delete(`${userServiceBaseUrl}/${ctx.params.id}`);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      ctx.status = error.response.status;
      ctx.body = error.response.data;
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal Server Error' };
    }
  }
});

router.get('/:id/dashboard', async (ctx) => {
  const userId = ctx.params.id;

  try {
    const [userRes, ridesRes, reservationsRes] = await Promise.all([
      axios.get(`http://localhost:5000/users/${userId}`),
      grpcCall(RideServiceClient.ListRides.bind(RideServiceClient), { user_id: userId }),
      axios.get(`http://localhost:4000/reservations/user/${userId}`),
    ]);

    ctx.status = 200;
    ctx.body = {
      user: userRes.data,
      rides: ridesRes,
      reservations: reservationsRes.data,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: 'Failed to fetch user dashboard',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
});


export default router;