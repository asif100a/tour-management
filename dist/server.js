/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import 'colors';
import app from './app.js';
import { envConfig } from './app/config/env.js';
import { seedSuperAdmin } from './app/utils/seedSuperAdmin.js';
let server;
const port = envConfig.PORT;
const startServer = async () => {
    try {
        await mongoose.connect(envConfig.DB_URL);
        console.log('Server connected successfully'.america.bold);
        server = app.listen(port, () => {
            console.log(`Server listening on http://localhost:${port}`.green.italic);
        });
    }
    catch (error) {
        console.error('❌ Error to start the server: '.red.bold, error);
    }
};
(async () => {
    await startServer();
    await seedSuperAdmin();
})();
// --------------Errors------------
process.on('SIGTERM', (err) => {
    console.error('❌ Sigterm Signal Error: ', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('SIGINT', () => {
    console.error('❌ SigInt  Error ');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection Error: ', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception Error: ', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// Unhandled Rejection
// Promise.reject(new Error("I forgot to give the catch block"))
// Uncaught Exception
// throw new Error('Wow! this error is amazing!!!')
//# sourceMappingURL=server.js.map