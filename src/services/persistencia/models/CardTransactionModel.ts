import { Schema, model, Document } from "mongoose";

export interface IToBuyBookModel extends Document {
	isbn: string;
	imgRef: string;
	title: string;
	author: string;
	releaseDate: string;
	grossPricePerUnit: number;
	inOffer: boolean;
	discountPercentage: number;
	hasIva: boolean;
	ivaPercentage: number;
	discountedAmount: number;
	ivaAmount: number;
	priceWithDiscount: number;
	priceWithIva: number;
	cant: number;
	priceCalcPerUnit: number;
}

export interface IToBuyCardModel extends Document {
	ownerName: string;
	cardNumber: string;
	expiryDate: string;
}

export interface IToBuyClientModel extends Document {
	user: string;
	name: string;
	email: string;
	mobile: string;
}

export interface ICardTransactionModel extends Document {
	id: string;
	date: string;
	payment: number;
	change: number;
	card: IToBuyCardModel;
	client: IToBuyClientModel;
	booksAcquired: [IToBuyBookModel];
	discountCalc: number;
	ivaCalc: number;
	subtotal: number;
	totalPrice: number;
}

const toBuyBooksSchema = new Schema({
	isbn: {
		type: String,
		required: true,
		trim: true,
	},
	imgRef: {
		type: String,
		required: true,
		trim: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	author: {
		type: String,
		required: true,
		trim: true,
	},
	releaseDate: {
		type: String,
		required: true,
		trim: true,
	},
	grossPricePerUnit: {
		type: Number,
		required: true,
	},
	inOffer: {
		type: Boolean,
		required: true,
	},
	discountPercentage: {
		type: Number,
		required: true,
	},
	hasIva: {
		type: Boolean,
		required: true,
	},
	ivaPercentage: {
		type: Number,
		required: true,
	},
	discountedAmount: {
		type: Number,
		required: true,
	},
	ivaAmount: {
		type: Number,
		required: true,
	},
	priceWithDiscount: {
		type: Number,
		required: true,
	},
	priceWithIva: {
		type: Number,
		required: true,
	},
	cant: {
		type: Number,
		required: true,
	},
	priceCalcPerUnit: {
		type: Number,
		required: true,
	},
});

const toBuyCardSchema = new Schema({
	ownerName: {
		type: String,
		required: true,
		trim: true,
	},
	cardNumber: {
		type: String,
		required: true,
		trim: true,
	},
	expiryDate: {
		type: String,
		required: true,
		trim: true,
	},
});

const toBuyClientSchema = new Schema({
	user: {
		type: String,
		required: true,
		trim: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	mobile: {
		type: String,
		required: true,
		trim: true,
	},
});

const cardTransactionSchema = new Schema(
	{
		id: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		date: {
			type: String,
			required: true,
			trim: true,
		},
		payment: {
			type: Number,
			required: true,
		},
		change: {
			type: Number,
			required: true,
		},
		card: {
			_id: false,
			type: toBuyCardSchema,
		},
		client: {
			_id: false,
			type: toBuyClientSchema,
		},
		booksAcquired: [
			{
				_id: false,
				type: toBuyBooksSchema,
			},
		],
		discountCalc: {
			type: Number,
			required: true,
		},
		ivaCalc: {
			type: Number,
			required: true,
		},
		subtotal: {
			type: Number,
			required: true,
		},
		totalPrice: {
			type: Number,
			required: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

export default model<ICardTransactionModel>("CardTransactions", cardTransactionSchema);
