const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);
const Order = require('./models/orders');
/** @type {import('admin-bro').AdminBroOptions} */

const options = {
    resources: [Order]
}

module.exports = options;