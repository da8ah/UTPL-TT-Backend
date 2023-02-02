import StockBook from "../../entities/StockBook";

export default interface IPersistenciaLibro {
	buscarUnLibroByIsbn(stockBook: StockBook): Promise<StockBook>;
	filtrarLibros(searchString: String): Promise<StockBook[]>;
	guardarLibroNuevo(stockBook: StockBook): Promise<StockBook>;
	obtenerLibros(): Promise<StockBook[]>;
	actualizarLibro(bookToSearch: StockBook, bookToUpdate: StockBook): Promise<StockBook>;
	eliminarLibro(stockBook: StockBook): Promise<StockBook>;
}
