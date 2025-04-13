import Router from 'koa-router';
import axios from 'axios';

const router = new Router({
  prefix: '/reservations', 
});

const reservationServiceBaseUrl = 'http://localhost:4000/reservations';

router.get('/', async (ctx) => {
  try {
    const response = await axios.get(reservationServiceBaseUrl);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ctx.status = error.response?.status || 500;
      ctx.body = error.response?.data || { message: 'Internal Server Error' };
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal Server Error' };
    }
  }
});

router.get('/:id', async (ctx) => {
  try {
    const response = await axios.get(`${reservationServiceBaseUrl}/${ctx.params.id}`);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        ctx.status = error.response?.status || 500;
        ctx.body = error.response?.data || { message: 'Internal Server Error' };
      } else {
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error' };
      }
    }
});

router.get('/user/:userId', async (ctx) => {
  try {
    const response = await axios.get(`${reservationServiceBaseUrl}/user/${ctx.params.userId}`);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        ctx.status = error.response?.status || 500;
        ctx.body = error.response?.data || { message: 'Internal Server Error' };
      } else {
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error' };
      }
    }
});

router.get('/ride/:rideId', async (ctx) => {
  try {
    const response = await axios.get(`${reservationServiceBaseUrl}/ride/${ctx.params.rideId}`);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        ctx.status = error.response?.status || 500;
        ctx.body = error.response?.data || { message: 'Internal Server Error' };
      } else {
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error' };
      }
    }
});

router.post('/', async (ctx) => {
  try {
    const response = await axios.post(reservationServiceBaseUrl, ctx.request.body);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        ctx.status = error.response?.status || 500;
        ctx.body = error.response?.data || { message: 'Internal Server Error' };
      } else {
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error' };
      }
    }
});

router.put('/:id', async (ctx) => {
  try {
    const response = await axios.put(`${reservationServiceBaseUrl}/${ctx.params.id}`, ctx.request.body);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        ctx.status = error.response?.status || 500;
        ctx.body = error.response?.data || { message: 'Internal Server Error' };
      } else {
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error' };
      }
    }
});

router.put('/:id/status/:status', async (ctx) => {
  try {
    const response = await axios.put(`${reservationServiceBaseUrl}/${ctx.params.id}/status/${ctx.params.status}`);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        ctx.status = error.response?.status || 500;
        ctx.body = error.response?.data || { message: 'Internal Server Error' };
      } else {
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error' };
      }
    }
});

router.delete('/:id', async (ctx) => {
  try {
    const response = await axios.delete(`${reservationServiceBaseUrl}/${ctx.params.id}`);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        ctx.status = error.response?.status || 500;
        ctx.body = error.response?.data || { message: 'Internal Server Error' };
      } else {
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error' };
      }
    }
});

export default router;