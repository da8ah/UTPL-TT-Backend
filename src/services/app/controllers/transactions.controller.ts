import { Request, Response } from "express";
import Client from "../../../core/entities/Client";
import TransaccionesDelClient from "../../../core/usecases/client/TransaccionesDelClient";
import PersistenciaDeTransacciones from "../../persistencia/adapters/PersistenciaDeTransacciones";
import { TransactionConverter } from "../utils";

export default class TransactionsController {
	public async createCardTransaction(req: Request, res: Response) {
		try {
			const clientReturned = TransactionConverter.jsonToCardTransaction(req);
			const resultado = await new TransaccionesDelClient().registrarTransaccion(clientReturned, new PersistenciaDeTransacciones());
			if (!resultado.getUser()) return res.status(400).json({ msg: "Transaction was not saved!" });
			return res.status(200).json({ msg: "Transaction saved!" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async retrieveTransacions(req: Request, res: Response) {
		try {
			const client = new Client(req.params.user);
			const resultado = await new TransaccionesDelClient().listarMisTransacciones(client, new PersistenciaDeTransacciones());
			if (!resultado.getUser()) return res.status(404).json({ msg: "No transactions found!" });
			return res.status(200).json(resultado);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}
}
