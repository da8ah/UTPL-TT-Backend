import { Request, Response } from 'express';
import Client from '../../../core/entities/Client';
import GestionDeAutenticacionClient from '../../../core/usecases/GestionDeAutenticacionClient';
import PersistenciaDeCuentas from '../../persistencia/adapters/PersistenciaDeCuentas';
import { ClientConverter } from '../utils';

export default class AuthController {

    // private createToken(user: IUser) {
    //     return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    //         expiresIn: 900 // 15min
    //     });
    // }

    public async signUp(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ msg: `No valid input!` });

            const newClient = ClientConverter.jsonToClient(req);
            const useCaseGestionDeAutenticacionClient = new GestionDeAutenticacionClient();
            const resultado = await useCaseGestionDeAutenticacionClient.crearCuenta(newClient, new PersistenciaDeCuentas());
            if (resultado === newClient) return res.status(303).json({ msg: `${newClient.getUser()} already exists!` });
            if (!resultado.getUser()) return res.status(400).json({ msg: `${newClient.getUser()} was not saved!` });
            return res.status(201).json({ msg: `${resultado.getUser()} saved!` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

    public async logIn(req: Request, res: Response) {
        try {
            // const { email, password } = req.body;
            // if (!email || !password) return res.status(400).json();

            // const userFound = await UserModel.findOne({ email });
            // if (!userFound) return res.status(404).json();

            // const auth = await userFound.comparePassword(password);
            // if (!auth) return res.status(400).json();

            // const tokenCreated = createToken(userFound);

            // return res.status(200).cookie('jwt', tokenCreated, { expires: new Date(Date.now() + 900000), httpOnly: true, path: "payment" }).json({ jwt: tokenCreated });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }


    public async logOut(req: Request, res: Response) {
        try {
            // const scripts = [{ script: '/js/signin.js' }]
            // return res.status(200).render('signin', { title: "Sign In", scripts });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

}