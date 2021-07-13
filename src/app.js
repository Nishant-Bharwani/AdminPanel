require('dotenv').config();
const { default: AdminBro } = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/orders');
const app = express();
const port = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

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
    // const adminRouter = buildAdminRouter(admin, {
    //     authenticate: async(email, password) => {
    //         const user = await User.findOne({ email })
    //         if (user) {
    //             if (password === user.encryptedPassword) {
    //                 return user
    //             }
    //         }
    //         return false
    //     },
    //     cookiePassword: 'session Key',
    // });
    const adminRouter = buildAdminRouter(admin);
    app.use(admin.options.rootPath, adminRouter);
    // AdminBro.registerAdapter(AdminBroMongoose);
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
}


run();