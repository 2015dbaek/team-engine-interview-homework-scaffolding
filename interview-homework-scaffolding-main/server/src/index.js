import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { addEmployeeRoutes } from './employees/employee-routing';
import { addGroupRoutes } from './groups/group-routing';
import { addMessageRoutes } from './messages/message-routing';

import { DOMAIN, WEB_PORT } from './config/config';

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: [DOMAIN],
}));
app.options('*', cors());

const apiModule = express.Router();
apiModule.use(express.json());

addEmployeeRoutes(apiModule);
addGroupRoutes(apiModule);
addMessageRoutes(apiModule);

apiModule.all('*', (_req, res, _next) => {
  res.sendStatus(404);
});

app.use('/api', apiModule);

app.listen(WEB_PORT, () => {
  console.log(`Server running on port ${WEB_PORT} (production).`);
});

