var subject = require('./subject');

class observer {
    constructor(){}

    async notify(args) {
        console.log('Observer has been notified and received', args);
    }
}

module.exports = observer;