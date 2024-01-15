const router = require("express").Router();
const { Readable } = require("stream");
const { Users, Courses } = require("../database");

router.get("/icons/:user_id/:avatar", async(req, res) => {

    let { user_id, avatar } = req.params;
    let [image_name, format] = avatar.split(".");
    let data = null;
    try {
        data = await Users.findOne({ where: { data_id: user_id, avatar_name: image_name } });
    } catch (error) {
        console.log(error);
    }
    if(!data || !data.avatar_base64) return res.status(404).send({ code: 404, message: "Cannot found image!" });

    let buffer = Buffer.from(data.avatar_base64, "base64");
    let stream = Readable.from(buffer);

    res.setHeader("Content-Type", `image/${format}`);
    stream.push(buffer);
    stream.push(null);
    stream.pipe(res).on("pipe", () => res.end());

});

router.get("/courses/:course_id/banners/:filename", async(req, res) => {

    let { course_id, filename } = req.params;
    let [image_name, format] = filename.split(".");
    let data = null;
    try {
        data = await Courses.findOne({ where: { data_id: course_id, banner_name: image_name } });
    } catch (error) {
        console.log(error);
    }
    if(!data || !data.banner_base64) return res.status(404).send({ code: 404, message: "Cannot found image!" });

    let buffer = Buffer.from(data.banner_base64, "base64");
    let stream = Readable.from(buffer);

    res.setHeader("Content-Type", `image/${format}`);
    stream.push(buffer);
    stream.push(null);
    stream.pipe(res).on("pipe", () => res.end());

});

module.exports = router;