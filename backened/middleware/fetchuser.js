var jwt = require('jsonwebtoken');
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) res.status(401).send({ error: "please send valid token" })
    try {
        const data = jwt.verify(token, 'shhhhh')
        // res.send(req.user)
        // res.send(data);
        req.user = data.user;
        // res.send(data.user)
        next();
    }

    catch (error) {
        res.status(401).send({ error: "pslease send valid token" })

    }
}
module.exports = fetchuser;