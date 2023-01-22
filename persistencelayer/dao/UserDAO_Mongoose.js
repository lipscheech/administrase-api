const mongoose = require('mongoose');

const IUserDAO = require('./IUserDAO.js');

const User = require('../models/User');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class UserDAO_Mongoose extends IUserDAO {

    constructor() {
        super();
        mongoose.connect('mongodb+srv://lipscheech:VB5Cw_iAW_qDRaB@administrase.ieoskjm.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    async create(req, res) {
        let { nome, email, password } = req.body
        let findToBlock = await User.findOne({ email: email })

        if (!email || !password) {
            res.status(422).send("Você deve definir email e senha");
        } else if (findToBlock) {
            res.status(401).send("Usuário já cadastrado");
        } else {
            const salt = bcrypt.genSaltSync();
            const passwordEncript = bcrypt.hashSync(password, salt);
            const user = await User.create({
                nome: nome,
                email: email,
                password: passwordEncript
            });
            user.token = jwt.sign({ id:user._id }, "KEY_SECRET");
            return user;
        }

    }

    async login(req, res) {
        let { email, password } = req.body
        if (!email || !password) {
            res.status(422).send("Você deve definir email e senha");
        }
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            res.status(401).send("email ou senha invalidos");
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            res.status(401).send("email ou senha invalidos");
        }

        return user

    }

    async recovery() {
        let users = await User.find();
        return users;
    }
    async update(req) {
        let user = await User.findByIdAndUpdate(req.params.id, req.body,
            { new: true });
        return user;

    }
    async delete(req) {
        let user = await User.findByIdAndRemove(req.params.id);
        return user;
    }

    async search(req) {
        let users = await User.find(
            { email: req.query.email }
        );
        return users;

    }


}
module.exports = UserDAO_Mongoose;