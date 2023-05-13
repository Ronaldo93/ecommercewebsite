//middleware for checking user's role
function checkPermission (role) {
    return (req, res, next) => {
        if (req.session.username && req.session.username.role === role) {
            next();
        } else {
            res.status(403).send('Unauthorized');
        }
    }
}

module.exports = checkPermission;