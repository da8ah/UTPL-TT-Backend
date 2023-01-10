import StockBook from "../../entities/StockBook";

export default interface IPersistenciaLibro {
    guardarNuevoLibro(book: StockBook): boolean;
    obtenerLibros(): StockBook[];
    actualizarLibro(book: StockBook): boolean;
    eliminarLibro(book: StockBook): boolean;
}