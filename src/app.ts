import express, { Request, Response } from 'express';
import { AppDataSource } from './config/db';
import { PORT } from './config/env';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { requestLogger } from './middlewares/logger.middleware';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(requestLogger);
app.use("/api", routes);
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  // Send a response to the client
  res.send({message:"Welcome to Skillmap"});
});

AppDataSource.initialize()
.then(() => {
    console.log("PostgreSQL Database connected successfully!");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error));