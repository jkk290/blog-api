const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../../storages/queries');

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

exports.verifyAdmin = async (req, res) => {

    try {
        const isAdmin = await db.verifyAdmin(req.body.username);

        if (isAdmin === null) {
            return res.status(404).json({
                error: {
                    message: `${req.body.user} not found`
                }
            });
        };

        if (isAdmin) {
            return res.json({
                admin: true
            });
        }

        res.json({
            admin: false
        });    
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'Unable to verify user is admin'
            }
        })
    }
    
};

exports.verifyGet = (req, res) => {
    res.json({
        valid: true
    })
}