const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const bcrypt = require('bcrypt');
const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin';

AdminBro.registerAdapter(AdminBroMongoose);
const Order = require('./models/orders');
const User = require('./models/admin.users');
/** @type {import('admin-bro').AdminBroOptions} */

const options = {
    resources: [Order, {
        resource: User,
        options: {
            properties: {
                encryptedPassword: { isVisible: false },
                password: {
                    type: 'string',
                    isVisible: {
                        list: false,
                        edit: true,
                        filter: false,
                        show: false,
                    },
                },
            },
            actions: {
                new: {
                    before: async(request) => {
                        if (request.payload.record.password) {
                            request.payload.record = {
                                ...request.payload.record,
                                encryptedPassword: await bcrypt.hash(request.payload.record.password, 10),
                                password: undefined,
                            }
                        }
                        return request
                    },
                },
                edit: { isAccessible: canModifyUsers },
                delete: { isAccessible: canModifyUsers },
                new: { isAccessible: canModifyUsers },
            }
        }
    }]
}

module.exports = options;