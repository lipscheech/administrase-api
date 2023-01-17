const express = require('express');
const bodyParser = require('body-parser');
//================================

var cors = require('cors');

const IRoutes = require('./IRoutes.js');

const app = express();


const config = require('../config.js');
let UserController = require('../controllers/'+config.IUserController);

let userController = new UserController();
// ----- IMC ----
let ImcController = require('../controllers/'+config.IImcController);

let imcController = new ImcController();



class Routes extends IRoutes{

  constructor() {   
    super();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  
app.use(cors());      
} // finaliza construtor

  get(){
      app.get('/', (req, res) => {
      res.send('Rest API IMC');
      });
      app.get('/user', userController.show);

      app.get('/user/search', userController.index)
      // ---- IMC ----
      app.get('/imc', imcController.show);

      app.get('/imc/search', imcController.index)

      app.get('/imc/searchbyuser/:iduser', imcController.indexbyUser)
      
// lista user, filtrando por email
// ex: /user/buscaemail/?email=vaguetti@gmail.com
//=========================
  }
  post(){
    app.post('/user', userController.store);
// lista user
    // ---- IMC -----
    app.post('/imc', imcController.store);
  }

  listen(){
    app.listen(3000, () => console.log('server started'));
     }

}
module.exports = Routes;
