import React, {Component} from 'react';
import Task from './Task';

class Tasks extends Component {

  onUpdateStatus = (id) => {
    this.props.onUpdateStatus(id);
  };

  onUpdate = (id) => {
    this.props.onUpdate(id);
  };

  // function props in parent component
  onDelete = (id) => {
    this.props.onDelete(id);
  };

  render() {
    let { tasks } = this.props;
    this.tasks = tasks.map(
      (task, index) => {
        return <Task
          key={ task.id }
          index={ index + 1 }
          task={ task }
          onUpdateStatus={ this.onUpdateStatus }
          onUpdate={ this.onUpdate }
          onDelete={ this.onDelete } />
      }
    );
    return (
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td></td>
              <td>
                <input type="text" className="form-control"/>
              </td>
              <td>
                <select className="form-control">
                  <option value="-1">Tất Cả</option>
                  <option value="0">Ẩn</option>
                  <option value="1">Kích Hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>
            { this.tasks }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Tasks;