const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.loginPost = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({
                error: {
                    message: 'Unable to log in'
                }
            });
        };

        if (!user) {
            return res.status(401).json({
                error: {
                    message: 'Log in failed',
                    details: info.message
                }
            });
        }

        const token = jwt.sign({
            sub: user.id,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60});

        return res.json({
            message: 'Log in successful',
            token: token
        });
    })(req, res, next);
};