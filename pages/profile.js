const router = require("express").Router();

router.get("/", (req, res) => {
    let { user } = req.session;
    let helmet = {
        title: "Profile │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/profile",
        image: user ? {
            url: `${req.domain}${user.avatar_url}`,
            height: 800,
            width: 800
        } : null,
    }
    return res.render("index", { req, helmet, page: "profile" });
});

router.get("/settings", (req, res) => {
    let { user } = req.session;
    let helmet = {
        title: "Profile │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/profile",
        image: user ? {
            url: `${req.domain}${user.avatar_url}`,
            height: 800,
            width: 800
        } : null,
    }
    return res.render("index", { req, helmet, page: "profile" });
});

module.exports = router;