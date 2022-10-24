export function is(role) {
    return (req, res, next) => {
        const hasRight = (req.user.role & role) ? true : false;
        if (!hasRight) { // On vérifie si le role de l'utilisateur correspond au role passé en paramètre
            return res.status(403).json({
                message: 'You don\'t have the right to access this resource.',
            });
        }
        next();
    };
}