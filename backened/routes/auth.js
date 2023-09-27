const express = require("express");
const User = require("../moels/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

// Create a user using POST "/api/auth", doesn't require authentication
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
   
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const secyp = await bcrypt.hash(req.body.password, salt);
        console.log(req.body.name)
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secyp
        });
        console.log("entered ")
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, 'shhhhh');
      success=true
        res.status(200).json({success,authtoken});
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            return res.status(400).json({ error: 'Emailsss already exists' });
        }
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    // if above condition is wrong then this below will be returned
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // tring tto login
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false
            return res.status(400).json({ errors: "try to login again" });
        }
        const passwordcheck = await bcrypt.compare(password, user.password);
        if (!passwordcheck) {
            success=false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });

        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, 'shhhhh');

      success=true;
      res.status(200).json({ success, authtoken })
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            return res.status(400).json({ error: 'Email already exists' });
        }
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.post(
    "/getuser", fetchuser,
    async (req, res) => {
        try {
            const userId = req.user;

            //  res.send(req.user.id)
            const user = await User.findById(userId.id);
            res.send(user);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);


module.exports = router;