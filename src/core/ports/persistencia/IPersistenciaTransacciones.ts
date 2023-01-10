import Transaction from "../../entities/Transaction";

export default interface IPersistenciaTransacciones {
    guardarTransaccion(transaction: Transaction): boolean;
    obtenerTransacciones(): Transaction[];
}