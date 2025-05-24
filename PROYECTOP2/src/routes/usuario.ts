import express from 'express';
import { insertUser, getUsers, getUserById, updateUser, deleteUser } from '../curd/usuario';

const router = express.Router();

router.post('/', async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    const user = await insertUser(nombre, email, password, rol);
    res.json(user);
});

router.get('/', async (req, res) => {
    const users = await getUsers();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await getUserById(Number(id));
    res.json(user);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password, rol } = req.body;
    const user = await updateUser(Number(id), nombre, email, password);
    res.json(user);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await deleteUser(Number(id));
    res.json(user);
});

export default router;
