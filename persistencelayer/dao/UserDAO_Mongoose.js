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
            return
        } else if (findToBlock) {
            res.status(401).send("Usuário já cadastrado");
            return
        } else {
            const salt = bcrypt.genSaltSync();
            const passwordEncript = bcrypt.hashSync(password, salt);
            const user = await User.create({
                nome: nome,
                email: email,
                password: passwordEncript,
            });
            let token = jwt.sign({ id: user._id }, "KEY_SECRET");
            user.updateOne({ $set: { token: token } }).exec();
            return user;
        }

    }

    async login(req, res) {
        let { email, password } = req.body
        if (!email || !password) {
            res.status(422).send("Você deve definir email e senha");
            return;
        }
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            res.status(401).send("email ou senha invalidos");
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            res.status(401).send("email ou senha invalidos");
            return;
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

    async autentication(req, res, next) {
        const { authorization } = req.headers
        if (!authorization) {
            res.status(401).send("O usuário precisa estar logado");
        }
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, "KEY_SECRET", async (err, payload) => {
            if (err) {
                res.status(401).send("O usuário precisa estar logado");
                return;
            }
            const { id } = payload;
            const user = await User.find({ _id: id });
            if (!user) {
                res.status(401).send("O usuário precisa estar logado");
                return;
            }
            req.user = user
            next();
        })
    }


}
module.exports = UserDAO_Mongoose;