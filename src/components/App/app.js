import React, { Component } from 'react';
import './style.scss';

import IndexDb from './indexdb.js';
import TaskCreator from '../TaskCreator/taskcreator.js';
import TaskList from '../TaskList/tasklist.js';
import Task from '../Task/task.js';
import Footer from '../footer.js';


class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    tasks: [],
  }
}

componentWillMount(){
  IndexDb.init()
  .then( () => {
    IndexDb.getAllTasks()
    .then( (todo_list) => {
      this.setState( { tasks: todo_list});
    });
  });
};
componentWillUnmount(){
  IndexDb.close();
}

removeTask(index) {
  const tasks = this.state.tasks;
  const task = tasks[index];
  tasks.splice(index, 1);
  IndexDb.deleteTask(task.date)
    .then( (created_date) => {
      console.log( "todo removed is:", created_date);
       this.setState({
        tasks: tasks
      });
    });
}

createTask(e) {
  if(e.which !== 13 || e.target.value === "")
  return;

  const tasks = this.state.tasks;
  const date = new Date();
  const task = {
    taskName: e.target.value,
    date,
  }
  tasks.push(task);
  IndexDb.addTask(task)
    .then( (created_date) => {
      console.log( "todo added is:", created_date);
       this.setState({
        tasks: tasks
      });
    });
    e.target.value = "";
}
  render() {
    return (
      <div className="App">
        <h2>My TodoList</h2>
        <TaskCreator onKeyUpHandler={this.createTask.bind(this)} />

        <TaskList >
          {
            this.state.tasks.map((task, i)=>
              <Task
                key={i}
                onClickHandler={this.removeTask.bind(this, i)}
                taskName={task.taskName}
                createdOn={task.date}
              />
            )
          }
        </TaskList>

        <Footer />
      </div>
    );
  }
}

export default App;
