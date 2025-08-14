import * as cors from 'cors';
import * as express from 'express';
import { AppDataSource } from './data-source';

import middleware from './middleware';
import authRoutes from './routes/authRouters';
import financeOrderRoutes from './routes/financeOrder';
import financeTagRoutes from './routes/financeTagRoutes';
import financeTypeRoutes from './routes/financeTypeRoutes';
import userRoutes from './routes/userRoutes';
import RunSeedings from './seeding';

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
    // console.log("Data Source has been initialized!");

    /** Middleware */
    app.use(middleware);

    /** ROUTERS */
    app.use(authRoutes);
    app.use(userRoutes);
    app.use(financeOrderRoutes);
    app.use(financeTypeRoutes);
    app.use(financeTagRoutes);

    /** Seeders */
    await RunSeedings()

    // app.get('/users', getUsers);
    // app.get('/users/:id', getUserById);
    // app.post('/users', createUser);
    // app.put('/users/:id', updateUser);
    // app.delete('/users/:id', deleteUser);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  })
  .catch((error) =>
    console.log(error)
  );