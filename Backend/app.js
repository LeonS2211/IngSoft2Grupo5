import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'


import universidadesRoutes from './src/routes/universidades.js';
import rolesRoutes from './src/routes/roles.js'
import carrerasRoutes from './src/routes/carreras.js'
import personasRoutes from './src/routes/personas.js'
import horariosRoutes from './src/routes/horarios.js'
import cursosRoutes from './src/routes/cursos.js';
import personaCursosRoutes from './src/routes/personaCursos.js';
import citaRoutes from './src/routes/citas.js';
import calificacionRoutes from './src/routes/calificaciones.js';

let app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ result: 'OK'});
})

app.use("/persona", personasRoutes)
app.use("/universidad", universidadesRoutes);
app.use("/rol", rolesRoutes);
app.use("/carrera", carrerasRoutes);
app.use("/horario", horariosRoutes);
app.use("/curso", cursosRoutes);
app.use("/personaCurso", personaCursosRoutes);
app.use("/cita", citaRoutes);
app.use("/calificacion", calificacionRoutes);

export default app