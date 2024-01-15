const fetch = require("node-fetch").default;
const router = require("express").Router();

router.get("/", async(req, res) => {
    
    let data = null;
    try {
        let response = await fetch(`https://newsapi.org/v2/everything?q=mining&searchIn=title,description&apiKey=${process.env.NEWS_KEY}`);
        data = await response.json();
    } catch (error) {
        console.log(error);
        data = {
            code: 404,
            message: error
        }
    }
    return res.status(data.code || 200).send(data);

});

module.exports = router;