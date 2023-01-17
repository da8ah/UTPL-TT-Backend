import { ClientConverter } from "../../../services/app/utils";
import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";
import IPersistenciaTransacciones from "../../ports/persistencia/IPersistenciaTransacciones";

export default class TransaccionesDelClient {

    public async registrarTransaccion(client: Client, transaction: Transaction, iPersistenciaTransacciones: IPersistenciaTransacciones): Promise<Transaction> {
        return iPersistenciaTransacciones.guardarNuevaTransaccion(client, transaction);
    }

    public async listarMisTransacciones(client: Client, iPersistenciaTransacciones: IPersistenciaTransacciones): Promise<Transaction[]> {
        return iPersistenciaTransacciones.obtenerTransacciones(client);
    }

}