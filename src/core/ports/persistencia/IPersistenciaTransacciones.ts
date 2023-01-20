import Client from "../../entities/Client";

export default interface IPersistenciaTransacciones {
    guardarNuevaTransaccion(client: Client): Promise<Client>;
    obtenerTransacciones(client: Client): Promise<Client>;
}