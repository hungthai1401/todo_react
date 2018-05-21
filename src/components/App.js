import React, { Component } from 'react';
import CreateTask from './CreateTask';
import TaskControl from './TaskControl';
import Tasks from './Tasks';
import uuid from 'uuid';
import Storage from '../utils/Storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  // call when component render
  componentWillMount() {
    if (Storage.get('tasks')) {
      let tasks = JSON.parse(Storage.get('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }

  generateData = () => {
    let tasks = [
      {
        id: this.generateUUID(),
        name: 'Learn React',
        status: true
      },
      {
        id: this.generateUUID(),
        name: 'Learn Python',
        status: false
      },
      {
        id: this.generateUUID(),
        name: 'Learn PHP',
        status: true
      }
    ];

    Storage.save('tasks', JSON.stringify(tasks));
  };

  // generate unique id
  generateUUID = () => {
    return uuid.v4();
  };

  render() {
    let { tasks } = this.state; // let task = this.state.tasks
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr/>
        </div>
        <div className="row">
          <CreateTask />
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <button
              type="button"
              className="btn btn-primary mb-3" >
              <span className="fa fa-plus mr-2"></span>Thêm Công Việc
            </button>
            <button
              type="button"
              className="btn btn-danger ml-3 mb-3"
              onClick={ this.generateData } >
              Generate
            </button>
            <TaskControl />
            <Tasks tasks={ tasks } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
