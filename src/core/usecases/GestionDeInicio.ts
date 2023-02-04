import StockBook from "../entities/StockBook";
import IPersistenciaLibro from "../ports/persistencia/IPersistenciaLibro";

export default class GestionDeInicio {
	public async listarCatalogoDeLibrosVisibles(iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook[]> {
		return iPersistenciaLibro.obtenerLibrosVisibles();
	}

	public async buscarLibro(searchString: String, iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook[]> {
		return iPersistenciaLibro.filtrarLibros(searchString);
	}
}
