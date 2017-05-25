import React, { Component } from 'react';
import './style.scss';

class Task extends Component {

  convertDateToString(date){
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const day = date.getDate();
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return day + " - " + month + " - " + year + " " + hours + ":" + minutes + ":" + seconds;

  }

  render() {
    return (
      <li className="task" onClick={this.props.onClickHandler}>
        {this.props.taskName}
        <span className="date">
          Created on: {this.convertDateToString(this.props.createdOn)}
        </span>
        </li>
    );
  }
}

export default Task;
