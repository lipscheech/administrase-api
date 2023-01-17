const IBankController = require('./IBankController.js');

const config = require('../config.js');
const BankDAO = require('../persistencelayer/dao/' + config.IBankDAO);
let bankdao = new BankDAO();

class BankController extends IBankController {
   constructor() {
      super();

   }

   async show(req, res) {

      let banks = await bankdao.recovery();
      return res.json(banks);
   }
   async store(req, res) {
      const bank = await bankdao.create(req);
      return res.json(bank);
   }
   async destroy(req, res) {
      let bank = await bankdao.delete(req);
      return res.json(bank);
   }
   async update(req, res) {
      let bank = await bankdao.update(req);
      return res.json(bank);
   }

   async index(req, res) {
      let banks = await bankdao.search(req);
      return res.json(banks);
   }

   async indexbyUser(req, res) {
      let banks = await bankdao.searchbyUser(req);
      return res.json(banks);
   }

}
module.exports = BankController;