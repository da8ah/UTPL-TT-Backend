import Book from "./Book";

export default class StockBook extends Book {
    private createdDate: string;
    private description: string;
    private stock: number;
    private visible: boolean;
    private recommended: boolean;
    private bestSeller: boolean;
    private recent: boolean;

    constructor(isbn: string, imgRef: string, title: string, author: string, releaseDate: string,
        grossPricePerUnit: number, inOffer: boolean, discountPercentage: number, hasIva: boolean,
        createdDate: string,
        description: string,
        stock: number,
        visible: boolean,
        recommended: boolean,
        bestSeller: boolean,
        recent: boolean
    ) {
        super(isbn, imgRef, title, author, releaseDate, grossPricePerUnit, inOffer, discountPercentage, hasIva);
        this.createdDate = createdDate;
        this.description = description;
        this.stock = stock;
        this.visible = visible;
        this.recommended = recommended;
        this.bestSeller = bestSeller;
        this.recent = recent;
    }
}