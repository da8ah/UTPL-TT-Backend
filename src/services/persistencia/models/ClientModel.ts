import { Schema, model, Document } from 'mongoose';

export interface IClientModel extends Document {
    user: string,
    name: string,
    email: string,
    mobile: string,
    password: string,
    billingInfo: {
        toWhom: string,
        ci: string,
        provincia: string,
        ciudad: string,
        numCasa: string,
        calles: string
    },
    cards: {
        ownerName: string,
        cardNumber: string,
        code: string,
        expiryDate: string
    }[]
}

const billingInfoSchema = new Schema(
    {
        toWhom: {
            type: String,
            required: true,
            trim: true
        },
        ci: {
            type: String,
            required: true,
            trim: true
        },
        provincia: {
            type: String,
            required: true,
            trim: true
        },
        ciudad: {
            type: String,
            required: true,
            trim: true
        },
        numCasa: {
            type: String,
            required: true,
            trim: true
        },
        calles: {
            type: String,
            required: true,
            trim: true
        }
    }
);

const cardSchema = new Schema(
    {
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
        code: {
            type: String,
            required: true,
            trim: true
        },
        expiryDate: {
            type: String,
            required: true,
            trim: true
        }

    }
);

const clientSchema = new Schema(
    {
        user: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        mobile: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        billingInfo: [{ type: billingInfoSchema }],
        cards: [{ types: cardSchema }],
        transactions: [{
            id: {
                type: String,
                trim: true
            }
        }]
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default model<IClientModel>('Client', clientSchema);