const express =  require('express');
const app = express();


app.use(express.json());

const preguntas = [
    {id: 1, Question: 'Quien descubrio america?', respuesta: "Colon"},
    {id: 2, Question: 'Snoopy es perro?', respuesta: "si"},
    {id: 3, Question: 'En que pais estamos?', respuesta: "uruguay"},

];

app.get('/', (req, res) => {
    res.send('Conexion exitosa');
});

app.get('/api/preguntas', (req, res) => {
    res.send(preguntas);
});

app.get('/api/preguntas/:id', (req, res) => {
    let pregunta = preguntas.find(c => c.id === parseInt(req.params.id));
    if(!pregunta)return res.status(404).send('Pregunta no encontrada');
    else res.send(pregunta);
});

app.post('/api/preguntas', (req,res) => {
    const pregunta ={
        id:preguntas.length +1,
        Question: req.body.Question,
        respuesta:req.body.respuesta

    };
    preguntas.push(pregunta);
    res.send(pregunta);
});

app.delete('/api/preguntas/:id', (req, res) => {
    const pregunta = preguntas.find(c => c.id === parseInt(req.params.id));
    if(!pregunta) return res.status(404).send("Pregunta no encontrada");

    const index = preguntas.indexOf(pregunta);
    preguntas.splice(index, 1);
    res.send(pregunta);
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));