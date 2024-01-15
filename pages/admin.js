const router = require("express").Router();

router.get("/", (req, res) => {
    let { user } = req.session;
    if(!user) return res.redirect("/");
    if(!req.admins.includes(user.id)) return res.redirect("/");

    let helmet = {
        title: "Admin │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/admin",
        image: null,
    }
    return res.render("admin", { helmet, req });
});

router.get("/courses", (req, res) => {
    let { user } = req.session;
    if(!user) return res.redirect("/");
    if(!req.admins.includes(user.id)) return res.redirect("/");

    let helmet = {
        title: "Admin │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: "/admin/courses",
        image: null,
    }
    return res.render("admin", { helmet, req });
});

router.get("/courses/:typeOrId", (req, res) => {
    let { user } = req.session;
    if(!user) return res.redirect("/");
    if(!req.admins.includes(user.id)) return res.redirect("/");

    let helmet = {
        title: "Admin │ Smart Miners",
        description: "Get training from experts, courses, and guidance to master the mining industry in Indonesia.",
        path: `/admin/courses/${req.params.typeOrId}`,
        image: null,
    }
    return res.render("admin", { helmet, req });
});

module.exports = router;