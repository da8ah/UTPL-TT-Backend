import { Request } from "express";
import StockBook from "../../core/entities/StockBook";
import StockBookModel, { IStockBookModel } from "../persistencia/models/StockBookModel";

export class BookConverter {

    public static bookToJSON(stockBook: StockBook) {
        let json: any = {};
        if (stockBook.getIsbn() != undefined) json["isbn"] = stockBook.getIsbn();
        if (stockBook.getImgRef() != undefined) json["imgRef"] = stockBook.getImgRef();
        if (stockBook.getTitle() != undefined) json["title"] = stockBook.getTitle();
        if (stockBook.getAuthor() != undefined) json["author"] = stockBook.getAuthor();
        if (stockBook.getReleaseDate() != undefined) json["releaseDate"] = stockBook.getReleaseDate();
        if (stockBook.getGrossPricePerUnit() != undefined) json["grossPricePerUnit"] = stockBook.getGrossPricePerUnit();
        if (stockBook.isInOffer() != undefined) json["inOffer"] = stockBook.isInOffer();
        if (stockBook.getDiscountPercentage() != undefined) json["discountPercentage"] = stockBook.getDiscountPercentage();
        if (stockBook.itHasIva() != undefined) json["hasIva"] = stockBook.itHasIva();
        if (stockBook.getIvaPercentage() != undefined) json["ivaPercentage"] = stockBook.getIvaPercentage();
        if (stockBook.getCreatedDate() != undefined) json["createdDate"] = stockBook.getCreatedDate();
        if (stockBook.getDescription() != undefined) json["description"] = stockBook.getDescription();
        if (stockBook.getStock() != undefined) json["stock"] = stockBook.getStock();
        if (stockBook.isVisible() != undefined) json["visible"] = stockBook.isVisible();
        if (stockBook.isRecommended() != undefined) json["recommended"] = stockBook.isRecommended();
        if (stockBook.isBestSeller() != undefined) json["bestSeller"] = stockBook.isBestSeller();
        if (stockBook.isRecent() != undefined) json["recent"] = stockBook.isRecent();
        return json;
    }

    public static jsonToBook(req: Request) {
        // All Attrs from body
        const {
            isbn,
            imgRef,
            title,
            author,
            releaseDate,
            grossPricePerUnit,
            inOffer,
            discountPercentage,
            hasIva,
            createdDate,
            description,
            stock,
            visible,
            recommended,
            bestSeller,
            recent
        } = req.body;

        // NewStockBook with all Attrs
        const stockBook = new StockBook(
            isbn,
            imgRef,
            title,
            author,
            releaseDate,
            grossPricePerUnit,
            inOffer,
            discountPercentage,
            hasIva,
            createdDate,
            description,
            stock,
            visible,
            recommended,
            bestSeller,
            recent
        );

        return stockBook;
    }

    public static modelToBook(bookModel: IStockBookModel): StockBook {
        return new StockBook(
            bookModel.isbn,
            bookModel.imgRef,
            bookModel.title,
            bookModel.author,
            bookModel.releaseDate,
            bookModel.grossPricePerUnit,
            bookModel.inOffer,
            bookModel.discountPercentage,
            bookModel.hasIva,
            bookModel.createdDate,
            bookModel.description,
            bookModel.stock,
            bookModel.visible,
            bookModel.recommended,
            bookModel.bestSeller,
            bookModel.recent,
        );
    }

    public static bookToModel(stockBook: StockBook): IStockBookModel {
        return new StockBookModel(
            {
                isbn: stockBook.getIsbn(),
                imgRef: stockBook.getImgRef(),
                title: stockBook.getTitle(),
                author: stockBook.getAuthor(),
                releaseDate: stockBook.getReleaseDate(),
                grossPricePerUnit: stockBook.getGrossPricePerUnit(),
                inOffer: stockBook.isInOffer(),
                discountPercentage: stockBook.getDiscountPercentage(),
                hasIva: stockBook.itHasIva(),
                ivaPercentage: stockBook.getIvaPercentage(),
                createdDate: stockBook.getCreatedDate(),
                description: stockBook.getDescription(),
                stock: stockBook.getStock(),
                visible: stockBook.isVisible(),
                recommended: stockBook.isRecommended(),
                bestSeller: stockBook.isBestSeller(),
                recent: stockBook.isRecent()
            }
        );
    }

}