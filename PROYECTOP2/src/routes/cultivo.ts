import express from 'express';
import { insertCultivo, getCultivos, getCultivoById, updateCultivo, deleteCultivo } from '../curd/cultivo';

const router = express.Router();

router.post('/', async (req, res) => {
    const { nombre, tipo, fecha_inicio, fecha_fin, zona  } = req.body;
    try {
        const cultivo = await insertCultivo(nombre, tipo, new Date(fecha_inicio), new Date(fecha_fin), zona);
        res.json(cultivo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el cultivo' });
    }
});

router.get('/', async (req, res) => {
    const cultivos = await getCultivos();
    res.json(cultivos);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const cultivo = await getCultivoById(Number(id));
    res.json(cultivo);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, fecha_inicio, fecha_fin, zona } = req.body;
    const cultivo = await updateCultivo(Number(id), nombre, tipo, new Date(fecha_inicio), new Date(fecha_fin),zona);
    res.json(cultivo);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleted = await deleteCultivo(Number(id));
    res.json(deleted);
});

export default router;
