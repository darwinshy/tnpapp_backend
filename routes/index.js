const express = require('express');

const router = express.Router();

// router.use(bodyParser.urlencoded({ extended: false }))
router.get('/', (req, res) => {
    res.send('Welcome to the home page');
});
router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "views" });
})
router.post("/register", (req, res) => {
    let resData = {
        serverData: req.body,
    };
    console.log(resData);
    res.status(200).send({success:true});

})
module.exports = router;
