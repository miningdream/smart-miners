const router = require("express").Router();

router.get("/", (req, res) => {



});

router.get("/user", (req, res) => {
    let { auth } = req.session;
    if(!auth) return res.status(200).send({ id: req.sessionID, data: null });
    else {
        let { type, access_token } = auth;
        if(auth.type === "google") {
            
        }
        else {

        }
    }
});

module.exports = router;