import { Request } from 'express';
import { Strategy, StrategyOptions } from 'passport-jwt';
import config from '../../config/config';
import AdminModel from '../../persistencia/models/AdminModel';
import ClientModel from '../../persistencia/models/ClientModel';

const tokenExtractor = function (req: Request) {
    let authorization = null;
    if (req && req.headers.authorization) authorization = req.headers.authorization;
    return authorization;
};

const options: StrategyOptions = {
    jwtFromRequest: tokenExtractor,
    secretOrKey: config.jwtSecret
}

export const authClient = new Strategy(options, async (payload, done) => {
    try {

        const user = await ClientModel.findOne({ user: payload.user });
        if (!user) return done(null, false);
        return done(null, user);

    } catch (error) {
        console.error(error);
    }
});

export const authAdmin = new Strategy(options, async (payload, done) => {
    try {

        const user = await AdminModel.findOne({ user: payload.user });
        if (!user) return done(null, false);
        return done(null, user);

    } catch (error) {
        console.error(error);
    }
});