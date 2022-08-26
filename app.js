const express = require('express');
const path = require('path');
require('./config/database')

const app = express();
const checkListRouter = require('./src/routes/checklist');
const rootRouter = require('./src/routes/index');


const { route } = require('./src/routes/checklist');




app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', rootRouter);
app.use('/checklists', checkListRouter);

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');



app.listen(3000, ()=> {
    console.log('Servidor Foi Iniciado');
});