export function is(role) {
    return [
        (req, res, next) => {
            const hasRight = (req.user.role & role) ? true : false;
            if (!hasRight) { // On vérifie si le role de l'utilisateur correspond au role passé en paramètre
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }
            next();
        }
    ];
}