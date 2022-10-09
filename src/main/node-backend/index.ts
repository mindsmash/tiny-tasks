import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Task } from './models/task';

const port = 8080;

const app: Express = express();
const tasks: Task[] = [];
let idCount = 0;

app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', (req: any, res: any) => {
  const search = req.query.search;

  let resultTasks = [...tasks];

  if (search) {
    resultTasks = tasks.filter((task) => {
      const taskName = task.name.toLowerCase();
      return taskName.includes(search.toLowerCase());
    });
  }

  res.send(resultTasks);
});

app.post('/tasks', (req: any, res: any) => {
  const name = req.body.name;
  const newTask: Task = {
    id: '' + idCount,
    name,
  };

  idCount++;

  tasks.push(newTask);

  res.send(newTask);
});

app.delete('/tasks/:id', (req: any, res: any) => {
  const id = req.params.id;
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
  res.status(200).send();
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
