const tls = require('tls')

const options = {
    host: 'imap.gmail.com',
    port: 993,
    //! testing
    rejectUnauthorized: false
}

const client = tls.connect(options, () => {
    console.log('Connected to srever');
})