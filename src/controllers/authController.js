const passport = require("passport");

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
        return res.json({
            message: 'Log in successful'
        });
    })(req, res, next);
};