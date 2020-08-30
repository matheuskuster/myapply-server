import 'reflect-metadata';
import express from 'express';

import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('🚀 Server listening on port 3333');
});

export default app;
