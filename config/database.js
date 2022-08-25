const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/*
mongoose.connect('mongodb://localhost/todo-list', {useNewUrlParse: true, useUnifiedTopology: true})
.then(() =>{
    console.log('Conectado ao Mongo')
}).catch((err) => {
    console.error(err)
});
*/

main().then(()=> {console.log('Conectado ao Mongo')}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/todo-list');
}