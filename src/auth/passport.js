const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const db = require('../../storages/queries');

const passportConfig = () => { 
    passport.use(
        new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUserByUsername(username);
            if (!user) {
                return done(null, false, { message: 'Incorrect username'});
            };
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password'});
            };
            return done(null, user);

        } catch (error) {
            return done(error);
        };  
        })
    );

    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };

    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            return done(null, jwt_payload);
        })
    );
};

module.exports = passportConfig;