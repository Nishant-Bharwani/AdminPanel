require('dotenv').config();
const { default: AdminBro } = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/orders');
const User = require('./models/admin.users');
const app = express();
const port = 3000 || process.env.PORT;



const run = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_HOSTNAME, {
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
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(router);
        app.listen(port, () => {
            console.log(`Admin panel running at http://localhost:${port}/admin`);
        });

        await User.deleteOne({
            email: process.env.ADMIN_EMAIL
        });
        const adminInfo = {
            email: process.env.ADMIN_EMAIL,
            encryptedPassword: process.env.ADMIN_PASSWORD,
            role: 'member'
        }

        await User.insertMany(adminInfo);
    } catch (err) {
        console.log(err);
    }
}


run();