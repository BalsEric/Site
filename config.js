//
// configuration for database and PORT
//

const config = {
    app: {
        port: 8080
    },
    db: {
        connection: 'mongodb+srv://@test-otk19.mongodb.net/test?retryWrites=true&w=majority',
        connection2:'mongodb+srv://@cluster0-4aaax.mongodb.net/test?retryWrites=true'
        
    }
};

module.exports = config;