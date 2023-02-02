import StockBook from "../entities/StockBook";
import IPersistenciaLibro from "../ports/persistencia/IPersistenciaLibro";

export default class GestionDeInicio {
	public async listarCatalogoDeLibros(iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook[]> {
		return iPersistenciaLibro.obtenerLibros();
	}

	public async buscarLibro(searchString: String, iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook[]> {
		return iPersistenciaLibro.filtrarLibros(searchString);
	}
}
