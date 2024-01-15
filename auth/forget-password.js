const FormData = require("form-data");
const Mailgun = require('mailgun.js').default;
const router = require("express").Router();
const { UsersPassword, Users } = require("../database");

const mailGun = new Mailgun(FormData);
const mg = mailGun.client({
    username: "postmaster@sandboxe8b07dc60f764800b22fc68da675e0fb.mailgun.org",
    key: process.env.MAILGUN_KEY
});

router.get("/", async(req, res) => {

    let { key, id } = req.query;
    let data = null;
    try {
        let schema = await UsersPassword.findOne({ where: { data_id: id, access_token: key } });
        if(!schema) data = { code: 404, message: "Cannot found user who want to change password!" }
    } catch (error) {
        console.log(error);
        data = {
            code: 500,
            message: error
        }
    }
    return res.status((data && data.code) || 204).send(data);

});

router.post("/", async(req, res) => {

    let { email } = req.body;
    let status;
    try {
        let user = await Users.findOne({ where: { email } });
        if(user) {
            let userPwd = await UsersPassword.create({
                name: user.name,
                email: user.email
            });

            await mg.messages.create(process.env.MAILGUN_DOMAIN, {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Smart Miners │ Change Password Confirmation",
                text: `
Dear ${user.name},

We hope this email finds you well. It has come to our attention that you have requested to change your password on Smart Miners. Your security is our top priority, and we are committed to ensuring the safety of your account.

If you initiated this password change, please use the following link to complete the process:

${req.domain}/login/forget-password?id=${userPwd.data_id}&key=${userPwd.access_token}

If you did not request this change or have any concerns, please contact our support team immediately at miningdreamgroup@gmail.com.

To protect your account, please do not share this email or the change password link with anyone. Smart Miners will never ask for your password through email or any other means.

Thank you for choosing Smart Miners. We appreciate your commitment to keeping your account secure.

Best regards,

Mining Dream
Smart Miners
miningdreamgroup@gmail.com
`
            });
        }
        status = 204;
    } catch (error) {
        console.log(error);
        status = 500;
    }
    return res.sendStatus(status);

});

router.patch("/", async(req, res) => {

    let { key, id } = req.query;
    let { password } = req.body;

    let status;
    try {
        let userPassword = await UsersPassword.findOne({ where: { data_id: id, access_token: key } });
        if(userPassword) {
            let user = await Users.findOne({ where: { name: userPassword.name, email: userPassword.email } });
            if(user) {
                user.password = password;
                await user.save();
                await userPassword.destroy();
            }
        }
        status = 204;
    } catch (error) {
        console.log(error);
        status = 500;
    }
    return res.sendStatus(status);
    
});

module.exports = router;