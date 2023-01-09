import Book from "./Book";

export default class ToBuyBook extends Book {
    private discountedAmount: number;
    private ivaAmount: number;
    private priceWithDiscount: number;
    private priceWithIva: number;
    private cant: number;
    private priceCalc: number;

    constructor(isbn: string, imgRef: string, title: string, author: string, releaseDate: string,
        grossPricePerUnit: number, inOffer: boolean, discountPercentage: number, hasIva: boolean,
        cant: number
    ) {
        super(isbn, imgRef, title, author, releaseDate, grossPricePerUnit, inOffer, discountPercentage, hasIva);
        this.discountedAmount = this.getDiscountPercentage() * this.getGrossPricePerUnit() / 100;
        this.ivaAmount = this.getIvaPercentage() * this.getGrossPricePerUnit() / 100;
        this.priceWithDiscount = this.getGrossPricePerUnit() - this.discountedAmount;
        this.priceWithIva = this.priceWithDiscount + this.ivaAmount;
        this.cant = cant;
        this.priceCalc = this.priceWithIva * this.cant;
    }

    public setIsbn(value: string): void {
        throw Error("Not implemented");
    }
}