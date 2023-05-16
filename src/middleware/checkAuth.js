// prevent user from seeing exceptions when error occurs (especially when using req.user in views)
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/"); // redirect to home page if not authenticated
}

module.exports = checkAuth;
