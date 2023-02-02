import { ClientConverter } from "../../services/app/utils";
import Client from "../entities/Client";
import IPersistenciaCuenta from "../ports/persistencia/IPersistenciaCuenta";
import IGestionDeAutenticacion from "./IGestionDeAutenticacion";

export default class GestionDeAutenticacionClient implements IGestionDeAutenticacion {
	public async crearCuenta(client: Client, iPersistenciaCuenta: IPersistenciaCuenta): Promise<Client> {
		const clientFound = await iPersistenciaCuenta.buscarCuenta(new Client(client.getUser()));
		if (clientFound.getUser()) return client;
		return (await iPersistenciaCuenta.guardarCuentaNueva(client)) as Client;
	}

	public async iniciarSesion(client: Client, iPersistenciaCuenta: IPersistenciaCuenta): Promise<Client> {
		const clientFound = ClientConverter.clientToModel((await iPersistenciaCuenta.buscarCuenta(client)) as Client);
		const password = client.getPassword();
		if (password !== undefined) {
			const auth = await clientFound.comparePassword(password);
			if (auth) {
				const clientAuthed = ClientConverter.modelToClient(clientFound);
				clientAuthed.setPassword("");
				return clientAuthed;
			}
		}
		return new Client();
	}
}
