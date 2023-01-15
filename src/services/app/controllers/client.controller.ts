import { Request, Response } from 'express';
import StockBook from '../../../core/entities/StockBook';
import GestionDeLibros from '../../../core/usecases/admin/GestionDeLibros';
import GestionDeInicio from '../../../core/usecases/GestionDeInicio';
import PersistenciaDeLibros from '../../persistencia/adapters/PersistenciaDeLibros';
import { BookConverter } from '../utils';

export default class ClientController {

    public async createClient(req: Request, res: Response) {
        try {

            const newStockBook = BookConverter.jsonToBook(req);
            const useCaseGestionarLibro = new GestionDeLibros();
            const resultado = await useCaseGestionarLibro.crearLibro(newStockBook, new PersistenciaDeLibros());
            if (resultado === newStockBook) return res.status(303).json({ msg: `${newStockBook.getIsbn()} already exists!` });
            if (!resultado.getIsbn()) return res.status(400).json({ msg: `${newStockBook.getIsbn()} was not saved!` });
            return res.status(200).json({ msg: `${resultado.getIsbn()} saved!` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

    public async updateClient(req: Request, res: Response) {
        try {

            const stockBookToSearch = new StockBook(req.params.isbn);
            const stockBookToUpdate = BookConverter.jsonToBook(req);
            const useCaseGestionarLibro = new GestionDeLibros();
            const resultado = await useCaseGestionarLibro.actualizarLibro(stockBookToSearch, stockBookToUpdate, new PersistenciaDeLibros());
            if (!resultado.getIsbn()) return res.status(404).json({ msg: `${stockBookToSearch.getIsbn()} was not found!` });
            return res.status(200).json({ msg: `${resultado.getIsbn()} updated!` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

    public async deleteClient(req: Request, res: Response) {
        try {

            const stockBookToDelete = new StockBook(req.params.isbn);
            const useCaseGestionarLibro = new GestionDeLibros();
            const resultado = await useCaseGestionarLibro.eliminarLibro(stockBookToDelete, new PersistenciaDeLibros());
            if (!resultado.getIsbn()) return res.status(404).json({ msg: `${stockBookToDelete.getIsbn()} was not found!` });
            return res.status(200).json({ msg: `${resultado.getIsbn()} deleted!` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

}