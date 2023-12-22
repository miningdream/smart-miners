const router = require("express").Router();

router.get("/", (req, res) => {
    let helmet = {
        title: "Home │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/",
        image: null,
    }
    res.render("index", { req, helmet, page: "home" });
});

router.get("/login", (req, res) => {
    let helmet = {
        title: "Log In │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/login",
        image: null,
    }
    res.render("index", { req, helmet, page: "login" });
});

module.exports = router;