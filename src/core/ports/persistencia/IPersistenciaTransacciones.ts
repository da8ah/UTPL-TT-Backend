import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";

export default interface IPersistenciaTransacciones {
    guardarNuevaTransaccion(client: Client, transaction: Transaction): Promise<Transaction>;
    obtenerTransacciones(client: Client): Promise<Transaction[]>;
}