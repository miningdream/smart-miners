const router = require("express").Router();

router.get("/", (req, res) => {
    let data = {
        session_id: req.sessionID,
        expires_at: req.session.cookie.expires.getTime(),
        user: req.session.user || null,
        is_admin: req.admins.includes(req.session.user?.id) || false
    }
    return res.status(200).send(data);
});

module.exports = router;