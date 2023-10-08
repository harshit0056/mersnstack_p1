const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const user = require('../models/user');
const jwtsecret="endtoendsecretyoutubeisgood$#"


router.post("/createuser", [body('email').isEmail(),
body('password', 'invalid password length').isLength({ min: 5 }), body('password').isLength({ max: 20 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt=await bcrypt.genSalt(10);
        let hashPassword=await bcrypt.hash(req.body.password,salt);
        try {
            user.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: hashPassword
            })
            res.json({ success: true });
        } catch (err) {
            res.json({ success: false });
        }
    })

router.post("/loginuser", [body('email').isEmail(),
body('password', 'invalid password length').isLength({ min: 5 }), body('password').isLength({ max: 20 })],
    async (req, res) => {
        let email = req.body.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let userdata = await user.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ errors: "credentials are not correct" });
            }
            
            const pwdCompare=await bcrypt.compare(req.body.password,userdata.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "credentials are not correct" });
            }

            const data = {
                user:{
                    id:userdata.id
                }
            }

            const authtoken= jwt.sign(data,jwtsecret)

            return res.json({ success: true ,authtoken : authtoken});
        } catch (err) {
            res.json({ success: false });
        }
    })

module.exports = router;