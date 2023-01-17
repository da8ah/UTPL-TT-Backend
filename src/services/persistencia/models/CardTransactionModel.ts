import { Schema, model, Document } from 'mongoose';

export interface ICardTransactionModel extends Document {
    id: string,
    date: string,
    payment: string,
    change: string,
    ownerName: string,
    cardNumber: string,
    expiryDate: string
}

const cardTransactionSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: String,
            required: true,
            trim: true
        },
        payment: {
            type: Number,
            required: true,
            trim: true
        },
        change: {
            type: Number,
            required: true,
            trim: true
        },
        ownerName: {
            type: String,
            required: true,
            trim: true
        },
        cardNumber: {
            type: String,
            required: true,
            trim: true
        },
        expiryDate: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default model<ICardTransactionModel>('CardTransactions', cardTransactionSchema);