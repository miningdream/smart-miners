const multer = require("multer");
const router = require("express").Router();
const upload = multer({
    fileFilter(req, file, cb) {
        cb(undefined, true);
    }
});

const { Courses } = require("../database");
const levels = {
    0: {
        label: "Beginner",
        value: 0
    },
    1: {
        label: "Intermediate",
        value: 1
    },
    2: {
        label: "Advanced",
        value: 2
    }
};

router.get("/", async(req, res) => {

    let { q } = req.query;
    if(q) q = q.split("+").join(" ");
    let data = null;
    try {
        let courses = await Courses.findAll();
        if(q) courses = courses.filter(value => value.keywords.includes(q) || value.title.toLowerCase().includes(q))
        data = courses.map(value => {
            return {
                id: value.data_id,
                title: value.title,
                description: value.short_description,
                author_id: value.author_id,
                source: {
                    name: value.source_name,
                    url: value.source_url
                },
                price: value.price,
                is_certified: value.is_certified,
                banner: {
                    name: value.banner_name,
                    url: `/storage/courses/${value.data_id}/banners/${value.banner_name}.webp`
                },
                level: levels[value.level],
                keywords: value.keywords.split(",").filter(value => value.length),
                date: {
                    start_timestamp: value.start_timestamp,
                    end_timestamp: value.end_timestamp
                },
                rating: value.rating
            }
        });
    } catch (error) {
        console.log(error);
        data = {
            code: 500,
            _errors: error
        }
    }
    return res.status(data.code || 200).send(data);

});

router.post("/", upload.single("banner"), async(req, res) => {
    let { user } = req.session;
    if(!user) return res.status(403).send({ code: 403, message: "Forbidden" });
    if(!req.admins.includes(user.id)) return res.status(403).send({ code: 403, message: "Forbidden" });

    let file = req.file;
    let { payload_json } = JSON.parse(JSON.stringify(req.body));
    let payload = JSON.parse(payload_json);

    let data = null;
    try {
        const generateID = () => {
            let str = '';
            let chars = 'abcedfghijklmnoprqstvuxwyzABCEDFGHIJKLKMNOPQRSTUVWXYZ123467890';
            for (let i = 0; i < 31; i++) {
                str += chars[Math.floor(Math.random()*chars.length)];
            }
            return str;
        }
        let response = await Courses.create({
            title: payload.title,
            author_id: user.id,
            short_description: payload.description,
            banner_name: generateID() + "_" + file.originalname.split(".")[0],
            banner_base64: file.buffer.toString("base64"),
            source_name: payload.source.name,
            source_url: payload.source.url,
            price: payload.price,
            is_certified: payload.is_certified,
            rating: payload.rating,
            level: payload.level.value,
            keywords: payload.keywords.join(","),
            start_timestamp: payload.date.start_timestamp,
            end_timestamp: payload.date.end_timestamp
        });

        data = {
            id: response.data_id,
            title: response.title,
            description: response.short_description,
            author_id: response.author_id,
            source: {
                name: response.source_name,
                url: response.source_url
            },
            price: response.price,
            is_certified: response.is_certified,
            banner: {
                name: response.banner_name,
                url: `/storage/courses/${response.data_id}/banners/${response.banner_name}.webp`
            },
            level: levels[response.level],
            keywords: response.keywords.split(",").filter(value => value.length),
            date: {
                start_timestamp: response.start_timestamp,
                end_timestamp: response.end_timestamp
            },
            rating: response.rating
        }
    } catch (error) {
        console.log(error);
        data = {
            code: 500,
            _errors: error
        }
    }

    return res.status(data.code || 200).send(data);
});

module.exports = router;