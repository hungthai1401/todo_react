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
      tasks: [],
      isCreate: false
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

  // generate unique id
  generateUUID = () => {
    return uuid.v4();
  };

  // toggle create task form
  toggleCreateTask = () => {
    this.setState({
      isCreate: !this.state.isCreate
    })
  };

  // close create task form
  onCloseCreateTask = () => {
    this.setState({
      isCreate: false
    })
  };

  // handle submit on children component
  onSubmit = (data) => {
    let { tasks } = this.state;
    let task = {
      id: this.generateUUID(),
      name: data.name,
      status: data.status === 'true' ? true : false
    };
    tasks.push(task);
    this.setState({
      tasks: tasks
    });

    Storage.save('tasks', JSON.stringify(tasks));
  };

  render() {
    let { tasks, isCreate } = this.state; // let task = this.state.tasks
    const createTask = isCreate ? <CreateTask
      onSubmit={ this.onSubmit }
      onCloseCreateTask={ this.onCloseCreateTask } /> : null;
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr/>
        </div>
        <div className="row">
          <div className={ isCreate ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
            { createTask }
          </div>
          <div className={ isCreate ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={ this.toggleCreateTask } >
              <span className="fa fa-plus mr-2"></span>Thêm Công Việc
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
