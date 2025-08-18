import * as cors from 'cors';
import * as express from 'express';

import AppMiddlewareProvider from './app/Providers/AppMiddlewareProvider';
import { AppDataSource } from './database/AppDataSource';
import authRoutes from './routes/authRouters';
import financeOrderRoutes from './routes/financeOrder';
import financeTagRoutes from './routes/financeTagRoutes';
import financeTypeRoutes from './routes/financeTypeRoutes';
import systemRoutes from './routes/systemRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:3002'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

AppDataSource.initialize()
  .then(async () => {

    /** Middleware */
    app.use(AppMiddlewareProvider);

    /** ROUTERS */
    app.use(systemRoutes);
    app.use(authRoutes);
    app.use(userRoutes);
    app.use(financeOrderRoutes);
    app.use(financeTagRoutes);
    app.use(financeTypeRoutes);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  })
  .catch((error) =>
    console.log(error)
  );