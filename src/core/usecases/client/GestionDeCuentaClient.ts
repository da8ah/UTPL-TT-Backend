import Client from "../../entities/Client";
import IPersistenciaCuenta from "../../ports/persistencia/IPersistenciaCuenta";

export default class GestionDeCuentaClient {
	public async actualizarCuenta(clientToSearch: Client, clientToUpdate: Client, iPersistenciaCuenta: IPersistenciaCuenta): Promise<Client> {
		return (await iPersistenciaCuenta.actualizarCuenta(clientToSearch, clientToUpdate)) as Client;
	}

	public async eliminarCuenta(client: Client, iPersistenciaCuenta: IPersistenciaCuenta): Promise<Client> {
		return (await iPersistenciaCuenta.eliminarCuenta(client)) as Client;
	}
}
