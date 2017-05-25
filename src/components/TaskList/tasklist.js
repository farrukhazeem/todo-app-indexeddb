import React, { Component } from 'react';
import './style.scss';


class TaskList extends Component {

  render() {
    return (
      <div>
        <h3> Task List </h3>
        <ul className="task--list">
          {this.props.children}
        </ul>
      </div>
    );
  }
}

export default TaskList;
