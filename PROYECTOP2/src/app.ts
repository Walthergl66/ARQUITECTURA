// import {insertCultivo, getCultivos,getCultivoById, updateCultivo, deleteCultivo} from './curd/cultivo'
// import { insertUser, getUsers, getUserById, updateUser, deleteUser } from './curd/usuario';
// import { InfoCampo, InsertCampo, InfoCampoById, UpdateCampo, DeleteCampo } from './curd/campo';
// import { insertRiego, getRiegos, getRiegoById, updateRiego, deleteRiego } from './curd/riego';
// import { insertSensor, getSensors, getSensorById, updateSensor, deleteSensor } from './curd/sensor';
// import { iniciar } from './database'


// async function mainCultivo() {
//     await iniciar()
//     const cultivo = await insertCultivo('Maiz', 'Grano', new Date('2023-01-01'), new Date('2023-06-01'));
//     console.log("Cultivo agregado correctamente ",cultivo);
//     const cultivos = await getCultivos();
//     console.log("Lista cultivos",cultivos);
//     const cultivoById = await getCultivoById(cultivo.id);
//     console.log("Cultivo ",cultivoById);
//     const updatedCultivo = await updateCultivo(cultivo.id, 'Maiz', 'Grano', new Date('2023-01-01'), new Date('2023-07-01'));
//     console.log("Cultivo actualizado", updatedCultivo);
//     const deletedCultivo = await deleteCultivo(cultivo.id);
//     console.log("cultivo eliminado correctamente", deletedCultivo);
// }

// async function mainUsuario() {
//     await iniciar()
//     const user = await insertUser('Pepito', 'admin', 'admi@example.com', 'admin');
//     console.log("Usuario agregado correctamente ", user);
//     const users = await getUsers();
//     console.log("Lista de usuarios", users);
//     const userById = await getUserById(user.id);
//     console.log("Usuario ", userById);
//     const updatedUser = await updateUser(user.id, 'Pepito', 'admin123', 'admin');
//     console.log("Usuario actualizado", updatedUser);
//     const deletedUser = await deleteUser(user.id);
//     console.log("Usuario eliminado correctamente", deletedUser);
// }

// async function mainCampo() {
//     await iniciar()
//     const campo = await InsertCampo('Zona 1', 'Maiz', 'invernadero');
//     console.log("Campo agregado correctamente ", campo);
//     const campos = await InfoCampo();
//     console.log("Lista de campos", campos);
//     const campoById = await InfoCampoById(campo.id);
//     console.log("Campo ", campoById);
//     const updatedCampo = await UpdateCampo(campo.id, 'Zona 1 actualizado', 'Maiz', 'invernadero');
//     console.log("Campo actualizado", updatedCampo);
//     const deletedCampo = await DeleteCampo(campo.id);
//     console.log("Campo eliminado correctamente", deletedCampo);
// }

// async function mainRiego() {
//     await iniciar()
//     const riego = await insertRiego(100, new Date('2023-01-01'), 'Zona 1');
//     console.log("Riego agregado correctamente ", riego);
//     const riegos = await getRiegos();
//     console.log("Lista de riegos", riegos);
//     const riegoById = await getRiegoById(riego.id);
//     console.log("Riego ", riegoById);
//     const updatedRiego = await updateRiego(riego.id, 150, new Date('2023-01-02'), 'Zona 1');
//     console.log("Riego actualizado", updatedRiego);
//     const deletedRiego = await deleteRiego(riego.id);
//     console.log("Riego eliminado correctamente", deletedRiego);
// }

// async function mainSensor() {
//     await iniciar()
//     const sensor = await insertSensor('Sensor 1', 'Deteccion',new Date('2023-01-01'),'Temperatura');
//     console.log("Sensor agregado correctamente ", sensor);
//     const sensors = await getSensors();
//     console.log("Lista de sensores", sensors);
//     const sensorById = await getSensorById(sensor.id);
//     console.log("Sensor ", sensorById);
//     const updatedSensor = await updateSensor(sensor.id, 'Sensor 1 actualizado', 'Deteccion', new Date('2023-01-02'), 'Humedad');
//     console.log("Sensor actualizado", updatedSensor);
//     const deletedSensor = await deleteSensor(sensor.id);
//     console.log("Sensor eliminado correctamente", deletedSensor);
// }
// //mainCultivo()
// // mainUsuario()
// // mainCampo()
// mainRiego()
// // mainSensor()




import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import { iniciar } from './database';

import cultivoRoutes from './routes/cultivo';
import usuarioRoutes from './routes/usuario';
// import campoRoutes from './routes/campo';
// import riegoRoutes from './routes/riego';
// import sensorRoutes from './routes/sensor';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, '../public')));

// Conectar a la base de datos
(async () => {
  try {
    await iniciar();
    console.log('✅ Conectado a la base de datos');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos', error);
  }
})();

// Rutas API
app.use('/cultivos', cultivoRoutes);
app.use('/usuarios', usuarioRoutes);
// app.use('/campos', campoRoutes);
// app.use('/riegos', riegoRoutes);
// app.use('/sensores', sensorRoutes);

// Ruta raíz sirve el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌎 Servidor corriendo en http://localhost:${PORT}`);
});
