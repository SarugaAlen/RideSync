import express from 'express';
import { UserController } from '../controllers/UserController';

const router = express.Router();


router.get('/:id', UserController.findUserById);
router.get('/', UserController.findAllUsers);
router.get('/email/:email', UserController.findUserByEmail);

router.post('/register', UserController.register);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;