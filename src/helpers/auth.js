
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Usuario NO autenticado');
    res.redirect('/users/signin');
};
