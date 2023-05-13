//middleware for checking user's role
function checkPermission (role) {
    return (req, res, next) => {
        if (req.user.username && req.user.username.role === role) {
            next();
        } else {
            res.status(403).send('Unauthorized');
        }
    }
}

module.exports = checkPermission;