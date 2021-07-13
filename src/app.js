require('dotenv').config();
const { default: AdminBro } = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');
const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/orders');
const app = express();
const port = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/order', async(req, res) => {
    try {
        const user = new Order(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/order', async(req, res) => {
    try {
        const data = await Order.find().sort({
            ranking: 1
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});


app.get('/order/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const data = await Order.findById(_id);
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

app.patch('/order/:id', async(req, res) => {
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

app.delete('/order/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const deletedData = await Order.findByIdAndDelete(_id);
        res.send(deletedData);
    } catch (err) {
        res.status(400).send(err);
    }
});
const run = async() => {
    const connection = await mongoose.connect(`${process.env.MONGODB_HOSTNAME}`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    if (connection != null) {
        console.log(`Connection Established`);
    }


    const admin = new AdminBro(options);
    const adminRouter = buildAdminRouter(admin);
    app.use(admin.options.rootPath, adminRouter);
    // AdminBro.registerAdapter(AdminBroMongoose);
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
}


run();