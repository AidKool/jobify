import express, { Request, Response } from 'express';
import path from 'path';
import db from './config/connection';

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
}

app.get('/', (_, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.get('*', (_, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

db.once('open', () => {
  console.log('Connection to database established');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
