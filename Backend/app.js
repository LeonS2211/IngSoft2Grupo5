import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import codigosQRRoutes from './src/routes/codigoQR.js';
import puntoReciclajesRoutes from './src/routes/puntoReciclaje.js'
import ubicacionesRoutes from './src/routes/ubicacion.js'
import usuarioAmigosRoutes from './src/routes/usuarioAmigo.js'
import usuarioPuntoReciclajesRoutes from './src/routes/usuarioPuntoReciclaje.js';
import usuariosRoutes from './src/routes/usuario.js'
import administradoresRoutes from './src/routes/administrador.js'
import objetivosRoutes from './src/routes/objetivo.js'
import recompensasRoutes from './src/routes/recompensa.js'
import usuarioObjetivosRoutes from './src/routes/usuarioObjetivo.js'
import usuarioRecompensasRoutes from './src/routes/usuarioRecompensa.js'
import comunidadesRoutes from './src/routes/comunidad.js'
import sugerenciaPuntoReciclajesRoutes from './src/routes/sugerenciaPuntoReciclaje.js';
import usuarioComunidadesRoutes from './src/routes/usuarioComunidad.js';
import comentarioComunidadesRoutes from './src/routes/comentarioComunidad.js'

let app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ result: 'OK'});
})

app.use("/codigoQR", codigosQRRoutes)
app.use("/puntoReciclaje", puntoReciclajesRoutes);
app.use("/ubicacion", ubicacionesRoutes);
app.use("/usuario", usuariosRoutes);
app.use("/usuarioAmigo", usuarioAmigosRoutes);
app.use("/usuarioPuntoReciclaje", usuarioPuntoReciclajesRoutes);
app.use("/administrador", administradoresRoutes);
app.use("/objetivo", objetivosRoutes);
app.use("/recompensa", recompensasRoutes);
app.use("/usuarioObjetivo", usuarioObjetivosRoutes);
app.use("/usuarioRecompensa", usuarioRecompensasRoutes);
app.use("/comunidad", comunidadesRoutes);
app.use("/sugerenciaPuntoReciclaje", sugerenciaPuntoReciclajesRoutes);
app.use("/usuarioComunidad", usuarioComunidadesRoutes);
app.use("/comentarioComunidad", comentarioComunidadesRoutes);

export default app