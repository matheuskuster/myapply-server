export default {
    jwt: {
        expiresIn: '1d',
        secret: process.env.APP_SECRET || 'default',
    },
};
