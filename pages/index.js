const router = require("express").Router();

router.get("/", (req, res) => {
    let helmet = {
        title: "Home │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/",
        image: null,
    }
    return res.render("index", { req, helmet, page: "home" });
});

router.get("/faq", (req, res) => {
    let helmet = {
        title: "FAQ │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/faq",
        image: null,
    }
    return res.render("index", { req, helmet, page: "faq" });
});

router.get("/courses", (req, res) => {
    let helmet = {
        title: "Courses │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/courses",
        image: null,
    }
    return res.render("index", { req, helmet, page: "courses" });
});

router.get("/news", (req, res) => {
    let helmet = {
        title: "News │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/news",
        image: null,
    }
    return res.render("index", { req, helmet, page: "news" });
});

router.get("/profile", (req, res) => {
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

router.get("/register", (req, res) => {
    let helmet = {
        title: "Sign Up │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/register",
        image: null,
    }
    return res.render("index", { req, helmet, page: "register" });
});


router.use("/profile", require("./profile"));
router.use("/admin", require("./admin"));
router.use("/login", require("./login"));

module.exports = router;