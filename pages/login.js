const router = require("express").Router();

router.get("/", (req, res) => {
    let helmet = {
        title: "Log In │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/login",
        image: null,
    }
    return res.render("index", { req, helmet, page: "login" });
});

router.get("/forget-password", (req, res) => {
    let helmet = {
        title: "Forget Password │ Log In │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/login/forget-password",
        image: null,
    }
    return res.render("index", { req, helmet, page: "login" });
});

module.exports = router;