import { Request, Response } from 'express';
import Client from '../../../core/entities/Client';
import GestionDeCuentaClient from '../../../core/usecases/client/GestionDeCuentaClient';
import PersistenciaDeCuentas from '../../persistencia/adapters/PersistenciaDeCuentas';
import { ClientConverter } from '../utils';

export default class ClientController {

    public async updateClient(req: Request, res: Response) {
        try {

            const clientToSearch = new Client(req.params.user);
            const clientToUpdate = ClientConverter.jsonToClient(req);
            const resultado = await new GestionDeCuentaClient().actualizarCuenta(clientToSearch, clientToUpdate, new PersistenciaDeCuentas());
            if (!resultado.getUser()) return res.status(404).json({ msg: `${clientToSearch.getUser()} was not found!` });
            return res.status(200).json({ msg: `${resultado.getUser()} updated!` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

    public async deleteClient(req: Request, res: Response) {
        try {

            const clientToDelete = new Client(req.params.user);
            const resultado = await new GestionDeCuentaClient().eliminarCuenta(clientToDelete, new PersistenciaDeCuentas());
            if (!resultado.getUser()) return res.status(404).json({ msg: `${clientToDelete.getUser()} was not found!` });
            return res.status(200).json({ msg: `${resultado.getUser()} deleted!` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

}