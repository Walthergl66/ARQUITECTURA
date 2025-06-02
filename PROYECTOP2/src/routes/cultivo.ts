import express from 'express';
import { TypeORMCultivoRepository } from '../Repository/TypeORMCultivoRepository';

const router = express.Router();
const cultivoRepo = new TypeORMCultivoRepository();

router.post('/', async (req, res) => {
    const { nombre, tipo, fecha_inicio, fecha_fin, zona  } = req.body;
    try {
        const cultivo = await cultivoRepo.insert(nombre, tipo, new Date(fecha_inicio), new Date(fecha_fin), zona);
        res.json(cultivo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el cultivo' });
    }
});

router.get('/', async (req, res) => {
    const cultivos = await cultivoRepo.findAll();
    res.json(cultivos);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const cultivo = await cultivoRepo.findById(Number(id));
    if (cultivo) res.json(cultivo);
    else res.status(404).json({ error: 'Cultivo no encontrado' });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, fecha_inicio, fecha_fin, zona } = req.body;
    const cultivo = await cultivoRepo.update(Number(id), nombre, tipo, new Date(fecha_inicio), new Date(fecha_fin), zona);
    if (cultivo) res.json(cultivo);
    else res.status(404).json({ error: 'Cultivo no encontrado' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleted = await cultivoRepo.delete(Number(id));
    if (deleted) res.json({ message: 'Cultivo eliminado' });
    else res.status(404).json({ error: 'Cultivo no encontrado' });
});

export default router;

