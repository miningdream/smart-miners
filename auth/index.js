const multer = require("multer");
const FormData = require("form-data");
const Mailgun = require('mailgun.js').default;
const router = require("express").Router();
const { Users, UsersVerify, UsersPassword, UsersSettings } = require("../database");

const mailGun = new Mailgun(FormData);
const mg = mailGun.client({
    username: "postmaster@sandboxe8b07dc60f764800b22fc68da675e0fb.mailgun.org",
    key: process.env.MAILGUN_KEY
});
const upload = multer({
    fileFilter(req, file, cb) {
        cb(undefined, true);
    }
});

router.get("/", (req, res) => {
    let data = {
        session_id: req.sessionID,
        expires_at: req.session.cookie.expires.getTime(),
        user: req.session.user || null
    }
    return res.status(200).send(data);
});

router.post("/", async(req, res) => {
    if(req.session.user) {
        let obj = {
            session_id: req.sessionID,
            expires_at: req.session.cookie.expires.getTime(),
            user: req.session.user || null,
            code: 200
        }
        return res.status(200).send(obj);
    }

    let { username, password } = req.body;
    let data = null;
    let verified = null;
    try {
        data = await Users.findOne({ where: { name: username, password } });
        verified = await UsersVerify.findOne({ where: { name: data.name, email: data.email } });
    } catch (error) {
        console.log(error);
    }
    
    let obj = null;
    if(data) {
        let notification = null;
        try {
            notification = await UsersSettings.findOne({ where: { data_id: data.data_id } });
            if(!notification) notification = await UsersSettings.create({ data_id: data.data_id })
        } catch (error) {
            console.log(error);
        }
        req.session.user = {
            id: data.data_id,
            username: data.name,
            display_name: data.display_name,
            email: data.email,
            password: data.password,
            avatar: data.avatar_name || null,
            avatar_url: data.avatar_base64 ? `/storage/icons/${data.data_id}/${data.avatar_name}.webp` : null,
            description: data.description,
            verified: verified ? false : true,
            notification: {
                promotional_email: notification.promotional_email,
                news: notification.news,
                consultation_update: notification.consultation_update
            }
        }
        obj = {
            session_id: req.sessionID,
            expires_at: req.session.cookie.expires.getTime(),
            user: req.session.user,
            code: 200
        }
    }
    else {
        obj = {
            code: 404,
            message: "Wrong username or password!"
        }
    }
    return res.status(obj.code).send(obj);
});

router.patch("/notification", async(req, res) => {

    let { user } = req.session;
    if(!user) return res.status(403).send({ code: 403, message: "Forbidden" });

    let status;
    try {
        let { promotional_email, news, consultation_update } = req.body;
        let data = await UsersSettings.findOne({ where: { data_id: user.id } });
        if(data) {
            data.promotional_email = promotional_email;
            data.news = news;
            data.consultation_update = consultation_update;
        }
        else data = new UsersSettings.create({ data_id: user.id, promotional_email, news, consultation_update });

        req.session.user.notification = req.body;
        await data.save();
        status = 204;
    } catch (error) {
        console.log(error);
        status = 500;
    }
    return res.sendStatus(status);

});

router.put("/", upload.single("avatar"), async(req, res) => {

    if(!req.session.user) return res.status(403).send({ code: 403, message: "Unauthorize" });

    let file = req.file;
    let { username, display_name, email, password } = JSON.parse(JSON.stringify(req.body));
    try {
        if(email !== req.session.user.email || username !== req.session.user.username) {
            let userUsername = await Users.findOne({
                where: {
                    name: username
                }
            });
            let userEmail = await Users.findOne({
                where: {
                    email: email
                }
            });
    
            if(userUsername) return res.status(409).send({ code: 409, message: "Username already exist!" });
            if(userEmail) return res.status(409).send({ code: 409, message: "Email already exist!" });
        }
    } catch (error) {
        console.log(error);
    }

    let data = null;
    try {
        let user = await Users.findOne({
            where: {
                name: req.session.user.username,
                email: req.session.user.email,
                password: req.session.user.password
            }
        });
        let verifies = await UsersVerify.findAll({
            where: {
                name: user.name,
                email: user.email
            }
        });
        let usersPassword = await UsersPassword.findAll({
            where: {
                name: user.name,
                email: user.email
            }
        });
        let notification = await UsersSettings.findOne({
            where: {
                data_id: user.data_id
            }
        });
        if(!notification) notification = await UsersSettings.create({ data_id: user.data_id });

        if(user) {
            const generateID = () => {
                let str = '';
                let chars = 'abcedfghijklmnoprqstvuxwyzABCEDFGHIJKLKMNOPQRSTUVWXYZ123467890';
                for (let i = 0; i < 31; i++) {
                    str += chars[Math.floor(Math.random()*chars.length)];
                }
                return str;
            }
            for (let i = 0; i < verifies.length; i++) {
                let verify = verifies[i];
                verify.name = username;
                verify.email = email;
                await verify.save();
            }
            for (let i = 0; i < usersPassword.length; i++) {
                let userPassword = usersPassword[i];
                userPassword.name = username;
                userPassword.email = email;
                await userPassword.save();
            }

            user.name = username;
            user.display_name = display_name;
            user.email = email;
            user.password = password;
            user.avatar_name = file ? `${generateID()}_${file.originalname.split(".")[0]}` : user.avatar_name;
            user.avatar_base64 = file ? file.buffer.toString("base64") : user.avatar_base64;
            await user.save();

            req.session.user = {
                id: user.data_id,
                username: user.name,
                display_name: user.display_name,
                email: user.email,
                password: user.password,
                avatar: user.avatar_name || null,
                avatar_url: user.avatar_base64 ? `/storage/icons/${user.data_id}/${user.avatar_name}.webp` : null,
                description: user.description,
                verified: verifies.length ? false : true,
                notification: {
                    promotional_email: notification.promotional_email,
                    news: notification.news,
                    consultation_update: notification.consultation_update
                }
            }

            req.session.save();
            data = {
                session_id: req.sessionID,
                expires_at: req.session.cookie.expires.getTime(),
                user: req.session.user,
                code: 200
            }
        }
        else data = {
            error: 404,
            message: "Cannot found user!"
        }
    } catch (error) {
        console.log(error);
        data = {
            code: 500,
            message: "There's something with the system!"
        }
    }
    return res.status(data.code).send(data);

});

router.delete("/", (req, res) => {
    req.session.destroy();
    return res.sendStatus(204);
});

router.post("/create", async(req, res) => {
    if(req.session.user) return res.sendStatus(204);

    let { username, display_name, email, password } = req.body;
    try {
        let userUsername = await Users.findOne({
            where: {
                name: username
            }
        });
        let userEmail = await Users.findOne({
            where: {
                email: email
            }
        });

        if(userUsername) return res.status(409).send({ code: 409, message: "Username already exist!" });
        if(userEmail) return res.status(409).send({ code: 409, message: "Email already exist!" });
    } catch (error) {
        console.log(error);
    }

    let data = null;
    try {
        let user = await Users.create({
            name: username,
            display_name: display_name,
            email: email,
            password: password,
            avatar_name: null,
            avatar_base64: null,
            description: null
        });
        let verified = await UsersVerify.create({
            name: user.name,
            email: user.email,
        });
        let notification = await UsersSettings.create({ data_id: user.data_id });

        req.session.user = {
            id: user.data_id,
            username: user.name,
            display_name: user.display_name,
            email: user.email,
            password: user.password,
            avatar: user.avatar_name || null,
            avatar_url: user.avatar_base64 ? `` : null,
            description: user.description,
            verified: false,
            notification: {
                promotional_email: notification.promotional_email,
                news: notification.news,
                consultation_update: notification.consultation_update
            }
        };
        data = {
            session_id: req.sessionID,
            expires_at: req.session.cookie.expires.getTime(),
            user: req.session.user,
            code: 200
        }

        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Smart Miners │ Verify Your Email Address to Activate Your Account",
            text: `
Dear ${user.name},

Thank you for registering on Smart Miners! We're excited to have you as a part of our community.

To complete the registration process and activate your account, we need you to verify your email address. Please follow the simple steps below:

Click on the verification link below:
${req.domain}/auth/verify?id=${verified.data_id}&key=${verified.access_token}

Note: This verification link is valid for the next 24 hours.

By verifying your email, you help us ensure the security of your account and keep you updated on important information related to your Smart Miners experience.

If you did not sign up for an account on Smart Miners, please disregard this email.

Thank you for choosing Smart Miners!

Best regards,
The Mining Dream Team

miningdreamgroup@gmail.com
`
        });
    } catch (error) {
        console.log(error);
        data = {
            code: 500,
            message: "Something wrong! Please try again!"
        }
    }
    return res.status(data.code).send(data);
});

router.delete("/delete", async(req, res) => {
    
    if(!req.session.user) return res.status(403).send({ code: 403, message: "Forbidden!" });
    let { id, username, email, password } = req.session.user;
    let status;
    try {
        let usersVerify = await UsersVerify.findAll({ where: { name: username, email } });
        let usersPassword = await UsersPassword.findAll({ where: { name: username, email } });
        for (let i = 0; i < usersVerify.length; i++) {
            await usersVerify[i].destroy();
        }
        for (let i = 0; i < usersPassword.length; i++) {
            await usersPassword[i].destroy();
        }
        await Users.destroy({ where: { data_id: id, name: username, email, password } });
        req.session.destroy();
        status = 204;
    } catch (error) {
        console.log(error);
        status = 500;
    }
    return res.sendStatus(status);

});

router.use("/admin", require("./admin"));
router.use("/verify", require("./verify"));
router.use("/forget-password", require("./forget-password"));

module.exports = router;