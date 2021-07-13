const express = require('express');
const router = new express.Router();
const Order = require('../models/orders');


router.post('/order', async(req, res) => {
    try {
        const user = new Order(req.body);
        console.log(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/order', async(req, res) => {
    try {
        const data = await Order.find().sort({
            ranking: 1
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});


router.get('/order/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const data = await Order.findById(_id);
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

router.patch('/order/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const updatedData = await Order.findByIdAndUpdate(_id, req.body, {
            new: true
        });

        res.status(500).send(updatedData);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/order/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const deletedData = await Order.findByIdAndDelete(_id);
        res.send(deletedData);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;