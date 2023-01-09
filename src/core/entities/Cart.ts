import ToBuyBook from "./ToBuyBook";

export default class Cart {
    private discountCalc: string;
    private ivaCalc: string;
    private subtotal: string;
    private totalPrice: string;
    private toBuyBooks: ToBuyBook[];

    constructor(discountCalc: string = "",
        ivaCalc: string = "",
        subtotal: string = "",
        totalPrice: string = "",
        toBuyBooks: ToBuyBook[] = []
    ) {
        this.discountCalc = discountCalc;
        this.ivaCalc = ivaCalc;
        this.subtotal = subtotal;
        this.totalPrice = totalPrice;
        this.toBuyBooks = toBuyBooks;
    }
}