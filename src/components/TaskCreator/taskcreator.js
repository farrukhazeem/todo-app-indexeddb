import React, { Component } from 'react';
import './style.scss';


class TaskCreator extends Component {

  render() {
    return (
      <div className="task--creator">
        <label>New Task:</label>
        <input
          type="text"
          onKeyUp={this.props.onKeyUpHandler}
          placeholder="Enter a Task Name"
        />
      </div>
    );
  }
}

export default TaskCreator;
