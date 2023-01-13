import StockBook from "../../../core/entities/StockBook";
import IPersistenciaLibro from "../../../core/ports/persistencia/IPersistenciaLibro";
import { BookConverter } from "../../app/utils";
import StockBookModel, { IStockBookModel } from "../models/StockBookModel";

export default class PersistenciaDeLibros implements IPersistenciaLibro {

    public async buscarUnLibroByIsbn(stockBook: StockBook): Promise<StockBook> {
        try {

            let bookFound: IStockBookModel | null = null;
            bookFound = await StockBookModel.findOne({ isbn: stockBook.getIsbn() });
            return (!bookFound) ? new StockBook() : BookConverter.modelToBook(bookFound);

        } catch (error) {
            console.error(error);
            return new StockBook();
        }
    }

    public async filtrarLibros(searchString: String): Promise<StockBook[]> {
        try {

            let books: IStockBookModel[] = await StockBookModel.find({ $text: { $search: `${searchString}` } }).limit(100);
            return (!books) ? [] : books.map((bookModel) => BookConverter.modelToBook(bookModel));

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public async guardarNuevoLibro(stockBook: StockBook): Promise<StockBook> {
        try {

            const newBookModel: IStockBookModel = BookConverter.bookToModel(stockBook);
            let savedBook: IStockBookModel = await newBookModel.save();
            return (!savedBook) ? new StockBook() : BookConverter.modelToBook(savedBook);

        } catch (error) {
            console.error(error);
            return new StockBook();
        }
    }

    public async obtenerLibros(): Promise<StockBook[]> {
        try {

            let books: IStockBookModel[] = await StockBookModel.find();
            return (!books) ? [] : books.map((bookModel) => BookConverter.modelToBook(bookModel));

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public async actualizarLibro(bookToSearch: StockBook, bookToUpdate: StockBook): Promise<StockBook> {
        try {

            let bookUpdated: IStockBookModel | null = null;
            bookUpdated = await StockBookModel.findOneAndUpdate({ isbn: bookToSearch.getIsbn() }, BookConverter.bookToJSON(bookToUpdate), { new: true });
            return (!bookUpdated) ? new StockBook() : BookConverter.modelToBook(bookUpdated);

        } catch (error) {
            console.error(error);
            return new StockBook();
        }
    }

    public async eliminarLibro(stockBook: StockBook): Promise<StockBook> {
        try {

            let bookDeleted: IStockBookModel | null = null;
            bookDeleted = await StockBookModel.findOneAndDelete({ isbn: stockBook.getIsbn() });
            return (!bookDeleted) ? new StockBook() : BookConverter.modelToBook(bookDeleted);

        } catch (error) {
            console.error(error);
            return new StockBook();
        }
    }

}