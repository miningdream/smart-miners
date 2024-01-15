const FormData = require("form-data");
const Mailgun = require('mailgun.js').default;
const router = require("express").Router();
const { Users, UsersVerify } = require("../database");

const mailGun = new Mailgun(FormData);
const mg = mailGun.client({
    username: "postmaster@sandboxe8b07dc60f764800b22fc68da675e0fb.mailgun.org",
    key: process.env.MAILGUN_KEY
});

router.get("/", async(req, res) => {
    if(!req.session.user) return res.redirect("/");
    let { key, id } = req.query;
    if(!key || !id) return res.redirect("/");

    let status;
    try {
        let verified = await UsersVerify.findOne({ where: { data_id: id, access_token: key } });
        if(verified) {
            let usersVerifies = await UsersVerify.findAll({ where: { name: verified.name, email: verified.email } });
            for (let i = 0; i < usersVerifies.length; i++) {
                await usersVerifies[i].destroy();
            }
        }
        req.session.user.verified = true;
        status = 204;
    } catch (error) {
        console.log(error);
        status = 500;
    }
    return res.redirect(status === 204 ? "/profile" : "/");

});

router.post("/resend", async(req, res) => {

    if(!req.session.user) return res.status(403).send({ code: 403, message: "Unauthorize" });
    let { username, email } = req.session.user;

    let status;
    try {
        let verified = await UsersVerify.create({
            name: username,
            email: email
        });

        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: process.env.EMAIL,
            to: email,
            subject: "Smart Miners │ Verify Your Email Address to Activate Your Account",
            text: `
Dear ${username},

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
        status = 204;
    } catch (error) {
        console.log(error);
        status = 500
    }
    return res.sendStatus(status);

});

module.exports = router;