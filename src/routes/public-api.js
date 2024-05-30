const express = require('express');
const getHistoryData = require('../service/firestore/predictions-history');
const auth = require('../config/passport');
const router = new express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// // Test route
// router.get('/test', (req, res) => {
//     return res.json({
//         status: 'success',
//         message: 'Hi!'
//     }).status(200);
// });

// // Get history
// router.get('/predict/histories', async (req, res) => {
//     const predictionHistoryData = await getHistoryData(); 

//     return res.json({
//         status: 'success',
//         data: predictionHistoryData,
//     })
// });


router.post('/register', async (req, res) => {
    try{
        const newUser = {
            email: req.body.email,
            fullName: req.body.fullName,
            favArticles: [],
            password: await bcrypt.hash(req.body.password, 10),
            profpicLink: '',
            userId: crypto.randomUUID()
        }
        User.createUser(newUser);

        return res.status(201).json({
            message: "user created",
            user: {
                email: newUser.email,
                fullName: newUser.fullName,
                userId: newUser.userId},
        });
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Failed to registering user');
    }
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.getUserByEmail(req.body.email);
        if(!user){
            return res.status(400).json({
                message: "user not found"
            })
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
            message: "password incorrect"
            });
        }

        const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {expiresIn: '1w'});

        return res.status(200).json({
            message: "login success",
            token: token
        })
    } catch (error) {
        console.error('Error logging in user:', error);
    }
})

router.get('/auth/google', auth.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    auth.authenticate('google', { 
        session: false, 
    }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.userId }, process.env.JWT_SECRET, {expiresIn: '1w'});

        return res.json({
            status: 'success',
            message: 'User authenticated',
            token: token
        });
    })

module.exports = router;