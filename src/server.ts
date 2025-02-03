import { app } from './app';

app.listen({
    host: '0.0.0.0',  // Bind to all network interfaces
    port: 3333,
}).then(() => {
    console.log('HTTP server running!')
})