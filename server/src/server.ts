import { readConfig } from './config.js';
import { createApp } from './app.js';
import { disconnectDatabase } from './service.js';

const config = readConfig();
const app = createApp(config);
const server = app.listen(config.PORT, '0.0.0.0', () => console.log(`MSME Negosyo Quest API listening on port ${config.PORT}`));

async function shutdown() {
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
}
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);