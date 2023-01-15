import ToBuyBook from "./ToBuyBook";

export default class Cart {
    private discountCalc: string | undefined = undefined;
    private ivaCalc: string | undefined = undefined;
    private subtotal: string | undefined = undefined;
    private totalPrice: string | undefined = undefined;
    private toBuyBooks: ToBuyBook[] | undefined = undefined;

    constructor(
        discountCalc: string,
        ivaCalc: string,
        subtotal: string,
        totalPrice: string,
        toBuyBooks: ToBuyBook[]
    ) { }

    public getDiscountCalc(): string | undefined {
        return this.discountCalc;
    }

    public setDiscountCalc(discountCalc: string): void {
        this.discountCalc = discountCalc;
    }

    public getIvaCalc(): string | undefined {
        return this.ivaCalc;
    }

    public setIvaCalc(ivaCalc: string): void {
        this.ivaCalc = ivaCalc;
    }

    public getSubtotal(): string | undefined {
        return this.subtotal;
    }

    public setSubtotal(subtotal: string): void {
        this.subtotal = subtotal;
    }

    public getTotalPrice(): string | undefined {
        return this.totalPrice;
    }

    public setTotalPrice(totalPrice: string): void {
        this.totalPrice = totalPrice;
    }

    public getToBuyBooks(): ToBuyBook[] | undefined {
        return this.toBuyBooks;
    }

    public setToBuyBooks(toBuyBooks: ToBuyBook[]): void {
        this.toBuyBooks = toBuyBooks;
    }
}