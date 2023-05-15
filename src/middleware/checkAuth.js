// prevent user from seeing exceptions when error occurs (especially when using req.user in views)
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // redirect to login page if not authenticated
}

module.exports = checkAuth;
