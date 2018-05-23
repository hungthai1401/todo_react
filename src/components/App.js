import React, { Component } from 'react';
import CreateTask from './CreateTask';
import TaskControl from './TaskControl';
import Tasks from './Tasks';
import uuid from 'uuid';
import _ from 'lodash';
import Storage from '../utils/Storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isCreate: false,
      task: null,
      filter: {
        name: '',
        status: -1
      },
      search: {
        name: ''
      }
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
    if (this.state.isCreate && this.state.task) {
      this.setState({
        isCreate: true,
        task: null
      })
    } else {
      this.setState({
        isCreate: !this.state.isCreate,
        task: null
      })
    }
  };

  // close create task form
  onCloseCreateTask = () => {
    this.setState({
      isCreate: false
    })
  };

  // find task by id
  findTaskById = (id) => {
    let { tasks } = this.state;
    let result = _.findIndex(tasks, (task) => {
      return task.id === id;
    });

    return result;
  };

  // handle submit on children component
  onSubmit = (data) => {
    let { tasks } = this.state;
    if (data.id) {
      let index = this.findTaskById(data.id);
      tasks[index] = data;
    } else {
      let task = {
        id: this.generateUUID(),
        name: data.name,
        status: data.status
      };

      tasks.push(task);
    }

    this.setState({
      tasks: tasks
    });

    Storage.save('tasks', JSON.stringify(tasks));
  };

  // event pass to props children component
  onUpdateStatus = (id) => {
    let { tasks } = this.state;
    let index = this.findTaskById(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      Storage.save('tasks', JSON.stringify(tasks));
    }
  };

  // open update task form
  onOpenUpdateTask = () => {
    this.setState({
      isCreate: true
    });
  };

  // update task
  onUpdate = (id) => {
    let { tasks } = this.state;
    let index = this.findTaskById(id);
    this.setState({
      task: tasks[index]
    });
    this.onOpenUpdateTask();
  };

  // delete task
  onDelete = (id) => {
    let { tasks } = this.state;
    let index = this.findTaskById(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      Storage.save('tasks', JSON.stringify(tasks));
    }
  };

  // pass to props of children component
  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName,
        status: filterStatus
      }
    });
  };

  onSearch = (searchName) => {
    searchName = searchName.toLowerCase();
    this.setState({
      search: {
        name: searchName
      }
    });
  };

  render() {
    let { tasks, isCreate, task, filter, search } = this.state; // let task = this.state.tasks

    // filter
    if (filter.name) {
      tasks = _.filter(tasks, (task) => {
        return task.name.toLocaleLowerCase().indexOf(filter.name.toLocaleLowerCase()) !== -1;
      });
    }

    tasks = _.filter(tasks, (task) => {
      if (filter.status === -1) {
        return tasks;
      }

      return task.status === Boolean(filter.status);
    });

    if (search.name) {
      tasks = _.filter(tasks, (task) => {
        return task.name.toLocaleLowerCase().indexOf(search.name) !== -1;
      });
    }

    const createTask = isCreate ?
      <CreateTask
        onSubmit={ this.onSubmit }
        onCloseCreateTask={ this.onCloseCreateTask }
        task={ task } /> : null;
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
            <TaskControl
              onSearch={ this.onSearch } />
            <Tasks
              tasks={ tasks }
              onUpdate={ this.onUpdate }
              onUpdateStatus={ this.onUpdateStatus }
              onDelete={ this.onDelete }
              onFilter={ this.onFilter } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
