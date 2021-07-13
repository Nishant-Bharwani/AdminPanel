const { default: AdminBro } = require('admin-bro');
// const { buildRouter } = require('admin-bro-expressjs');
const AdminBroExpressjs = require('admin-bro-expressjs');
const express = require('express');
const User = require('./models/admin.users');


/**
 * @param {AdminBro} admin
 * @return {express.Router} router
 */

// const buildAdminRouter = (admin) => {
//     const router = buildRouter(admin);
//     return router;
// };



const buildAdminRouter = (admin) => {
    const router = AdminBroExpressjs.buildAuthenticatedRouter(admin, {
        authenticate: async(email, password) => {
            const user = await User.findOne({ email })
            if (user) {
                if (password === user.encryptedPassword) {
                    return user;
                }
            }
            return false;
        },
        cookiePassword: 'session Key',
    });

    return router;
}

module.exports = buildAdminRouter;