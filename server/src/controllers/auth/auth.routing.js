const ExpressWrapper = require("../../helpers/expressWraper");
const {login, signup, logout} = require("./auth-post.action")

module.exports = {
    '/login': {
        post: {
            action: ExpressWrapper(login),
            level: 'public'
        },
    },
    '/signup': {
        post: {
            action: ExpressWrapper(signup),
            level: 'public'
        },
    },
    '/logout': {
        get: {
            action: ExpressWrapper(logout),
            level: 'public'
        },
    },
    
};
