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
let BankController = require('../controllers/'+config.IBankController);

let bankController = new BankController();



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
      app.get('/bank', bankController.show);

      app.get('/bank/search', bankController.index)

      app.get('/bank/searchbyuser/:iduser', bankController.indexbyUser)
      
// lista user, filtrando por email
// ex: /user/buscaemail/?email=vaguetti@gmail.com
//=========================
  }
  post(){
    app.post('/user', userController.store);
// lista user
    // ---- IMC -----
    app.post('/bank', bankController.store);
  }

  delete() {
    app.delete('/bank/:id', bankController.delete);
     
  }

  listen(){
    app.listen(3000, () => console.log('server started'));
     }

}
module.exports = Routes;
