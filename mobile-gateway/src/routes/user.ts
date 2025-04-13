import Router from 'koa-router';
import axios from 'axios';

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

export default router;