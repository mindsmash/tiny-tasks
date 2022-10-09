import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Status, Task } from './models/task';

const port = 8080;

const app: Express = express();
let tasks: Task[] = [
  {
    id: '0',
    name: 'New Task 1',
    status: Status.NEW,
  },
  {
    id: '1',
    name: 'New Task 2',
    status: Status.IN_PROGRESS,
  },
  {
    id: '2',
    name: 'New Task 3',
    status: Status.BLOCKED,
  },
  {
    id: '3',
    name: 'New Task 4',
    status: Status.DONE,
  },
];
let idCount = 4;

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

  resultTasks = getSortedTasksByStatus(resultTasks);

  res.send(resultTasks);
});

app.post('/tasks', (req: any, res: any) => {
  const name = req.body.name;
  const newTask: Task = {
    id: `${idCount}`,
    name,
    status: Status.NEW,
  };

  idCount++;

  tasks.push(newTask);

  res.send(newTask);
});

app.patch('/tasks', (req: any, res: any) => {
  const updatedTask = req.body.task;
  const index = tasks.findIndex((task) => task.id === updatedTask.id);

  tasks[index] = updatedTask;

  res.status(200).send();
});

app.delete('/tasks/clear-done', (req: any, res: any) => {
  tasks = tasks.filter((task) => task.status !== Status.DONE);
  res.status(200).send();
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

// HELPERS

const getSortedTasksByStatus = (tasks: Task[]) =>
  tasks.sort((a: Task, b: Task) => {
    if (a.status === Status.DONE && b.status !== Status.DONE) {
      return 1;
    } else if (a.status !== Status.DONE && b.status === Status.DONE) {
      return -1;
    }
    return 0;
  });
