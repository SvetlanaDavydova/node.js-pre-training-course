#!/usr/bin/env ts-node
// CLI entry for Task 10 – placeholder only

import { ToDoManager } from "./todo-manager";

const manager = new ToDoManager();
const title = process.argv[2];
const id = +process.argv[3];

manager.init().then(() => console.log('successfully initialized.'));
manager.add(title).then(() => console.log('successfully added.'));
manager.list().then((list) => console.log('list', list));
manager.complete(id).then();
