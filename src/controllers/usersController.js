const db = require('../../storages/queries');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
    try {
      const users = await db.getUsers();
      res.json(users);
        
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'Unable to retrieve users'
            }
        });
    };
};

exports.getUserById = async (req, res) => {
    try {
        const user = await db.getUserById(parseInt(req.params.userId));

        if (!user) {
            res.status(404).json({
                error: {
                    message: `User ID ${req.params.userId} not found`
                }
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            error: {
                message: 'Unable to retrieve user'
            }
        });
    };
};

exports.postUsers = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, confirmPassword } = req.body;

        if ((firstName === undefined) || (firstName === '')) {
            return res.status(400).json({
                error: {
                    message: 'First name cannot be empty'
                }
            });
        } else if ((username === undefined) || (username === '')) {
            return res.status(400).json({
                error: {
                    message: 'Username cannot be empty'
                }
            });
        } else if ((password === undefined) || (password === '')) {
            return res.status(400).json({
                error: {
                    message: 'Password cannot be empty'
                }
            });
        } else if ((confirmPassword === undefined) || (confirmPassword === '')) {
            return res.status(400).json({
                error: {
                    message: 'Confirm password cannot be empty'
                }
            });
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                error: {
                    message: 'Passwords did not match'
                }
            });
        };

        const hashedPw = await bcrypt.hash(password, 10);
        const user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPw
        };

        if (email === '') {
            user.email = null
        }

        const newUser = await db.postUsers(user);
        res.status(201).json({
            message: `${newUser.username} successfully created`
        });

    } catch (error) {
        console.error(error);
        if ((error.code === 'P2002') && (error.message.includes('username'))) {
            return res.status(400).json({
                error: {
                    message: `${req.body.username} already taken`
                }
            });
        } else if ((error.code === 'P2002') && (error.message.includes('email'))) {
            return res.status(400).json({
                error: {
                    message: `${req.body.email} already taken`
                }
            })
        }
        res.status(500).json({
            error: {
                message: 'Unable to update user'
            }
        });
    };
};

exports.putUsers = async (req, res) => {
    try {
        const { firstName, lastName, email, updatePassword, currentPassword, newPassword, confirmNewPassword } = req.body;

        if ((firstName === undefined) || (firstName === '')) {
            return res.status(400).json({
                error: {
                    message: 'First name cannot be empty'
                }
            });
        }

        const user = {
            id: parseInt(req.params.userId),
            firstName: firstName,
            lastName: lastName,
            email: email,
        };

        if (updatePassword === 'true') {            
            if ((currentPassword === undefined) || (currentPassword === '')) {
                return res.status(400).json({
                    error: {
                        message: 'Current password cannot be empty'
                    }
                });
            } else if ((newPassword === undefined) || (newPassword === '')) {
                return res.status(400).json({
                    error: {
                        message: 'Password cannot be empty'
                    }
                });
            } else if ((confirmNewPassword === undefined) || (confirmNewPassword === '')) {
                return res.status(400).json({
                    error: {
                        message: 'Confirm password cannot be empty'
                    }
                });
            } else if (newPassword !== confirmNewPassword) {
                return res.status(400).json({
                    error: {
                        message: 'Passwords did not match'
                    }
                });
            };

            const storedUser = await db.getUserById(user.id);

            const storedPw = storedUser.password;
            const match = await bcrypt.compare(currentPassword, storedPw);
            if (!match) {
                return res.status(400).json({
                    error: {
                        message: 'Entered current password is invalid'
                    }
                });
            };

            const hashedNewPw = await bcrypt.hash(newPassword, 10);

            user.password = hashedNewPw;
        };

        const updatedUser = await db.putUsers(user);
        res.status(200).json({
            message: `${updatedUser.username} successfully updated`
        });

    } catch (error) {
        console.error(error);
        if ((error.code === 'P2025') && (error.message.includes('No record was found'))) {
            return res.status(404).json({
                error: {
                    message: `User ID ${req.params.userId} not found`
                }
            });
        } else if ((error.code === 'P2002') && (error.message.includes('email'))) {
            return res.status(400).json({
                error: {
                    message: `${req.body.email} already taken`
                }
            })
        }
        res.status(500).json({
            error: {
                message: 'Unable to update user'
            }
        });
    };
};

exports.deleteUsers = async (req, res) => {
    try {
        await db.deleteUsers(parseInt(req.params.userId));
        res.sendStatus(204);
    } catch (error) {
        if ((error.code === 'P2025') && (error.message.includes('No record was found'))) {
            return res.status(404).json({
                error: {
                    message: `User ID ${req.params.userId} not found`
                }
            });
        };
        res.status(500).json({
            error: {
                message: 'Unable to delete user'
            }
        });
    };
};