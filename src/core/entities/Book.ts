export default abstract class Book {
    private isbn: string;
    private imgRef: string;
    private title: string;
    private author: string;
    private releaseDate: string;
    private grossPricePerUnit: number;
    private inOffer: boolean = false;
    private discountPercentage: number = 0;
    private hasIva: boolean = false;
    private ivaPercentage: number = 0 | 12; // only 0 or 12 allowed

    constructor(
        isbn: string,
        imgRef: string,
        title: string,
        author: string,
        releaseDate: string,
        grossPricePerUnit: number,
        inOffer: boolean,
        discountPercentage: number = 0,
        hasIva: boolean
    ) {
        this.isbn = isbn;
        this.imgRef = imgRef;
        this.title = title;
        this.author = author;
        this.releaseDate = releaseDate;
        this.grossPricePerUnit = grossPricePerUnit;
        this.setInOffer(inOffer);
        this.setDiscountPercentage(discountPercentage);
        this.setHasIva(hasIva);
    }

    // Getters
    public getIsbn(): string {
        return this.isbn;
    }

    public getImgRef(): string {
        return this.imgRef;
    }

    public getTitle(): string {
        return this.title;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getReleaseDate(): string {
        return this.releaseDate;
    }

    public getGrossPricePerUnit(): number {
        return this.grossPricePerUnit;
    }

    // Setters
    public setIsbn(value: string) {
        this.isbn = value;
    }
    public setImgRef(value: string) {
        this.imgRef = value;
    }
    public setTitle(value: string) {
        this.title = value;
    }
    public setAuthor(value: string) {
        this.author = value;
    }
    public setReleaseDate(value: string) {
        this.releaseDate = value;
    }
    public setGrossPricePerUnit(value: number) {
        this.grossPricePerUnit = value;
    }

    // Offer & IVA
    public isInOffer(): boolean {
        return this.inOffer;
    }
    public setInOffer(value: boolean) {
        this.inOffer = value;
    }
    public getDiscountPercentage(): number {
        return this.discountPercentage;
    }
    public setDiscountPercentage(discountPercentage: number) {
        // if this.inOffer = true && (0 < value <= 100); then this.discountPercentage = value;
        // else this.discountPercentage = 0 && this.inOffer = false;
        switch (this.isInOffer()) {
            case false:
                this.discountPercentage = 0;
                break;
            case true:
                if (discountPercentage > 0 && discountPercentage <= 100) {
                    this.discountPercentage = discountPercentage;
                } else {
                    this.discountPercentage = 0;
                    this.inOffer = false;
                }
                break;
        }
    }

    public itHasIva(): boolean {
        return this.hasIva;
    }
    public setHasIva(hasIva: boolean) {
        // if this.hasIva = true; then this.ivaPercentage = 12;
        // else this.ivaPercentage = 0;
        this.hasIva = hasIva;
        switch (hasIva) {
            case false:
                this.setIvaPercentage(0);
                break;
            case true:
                this.setIvaPercentage(1);
                break;
        }
    }
    public getIvaPercentage(): number {
        return this.ivaPercentage;
    }
    private setIvaPercentage(value: number = 0 | 1) {
        switch (value) {
            case 0:
                this.ivaPercentage = 0;
                break;
            case 1:
                this.ivaPercentage = 12;
                break;
            default:
                this.ivaPercentage = 0;
                break;
        }
    }
}