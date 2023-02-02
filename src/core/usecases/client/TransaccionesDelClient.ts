import Client from "../../entities/Client";
import IPersistenciaTransacciones from "../../ports/persistencia/IPersistenciaTransacciones";

export default class TransaccionesDelClient {
	public async registrarTransaccion(client: Client, iPersistenciaTransacciones: IPersistenciaTransacciones): Promise<Client> {
		return await iPersistenciaTransacciones.guardarNuevaTransaccion(client);
	}

	public async listarMisTransacciones(client: Client, iPersistenciaTransacciones: IPersistenciaTransacciones): Promise<Client> {
		return await iPersistenciaTransacciones.obtenerTransacciones(client);
	}
}
