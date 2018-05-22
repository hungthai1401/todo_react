import React, {Component} from 'react';

class Task extends Component {

  // generate status
  generateStatus = (status) => {
    if (status) {
      return {
        label: 'label label-success',
        status: 'Kích hoạt'
      };
    }

    return {
      label: 'label label-danger',
      status: 'Ẩn'
    };
  };

  // event update status and pass to props
  onUpdateStatus = () => {
    let { task } = this.props;
    this.props.onUpdateStatus(task.id);
  };

  // event delete task and pass to props
  onDelete = () => {
    let { task } = this.props;
    this.props.onDelete(task.id);
  };

  onUpdate = () => {
    let { task } = this.props;
    this.props.onUpdate(task.id);
  };

  render() {
    let { index, task } = this.props;
    let { label, status } = this.generateStatus(task.status);
    return (
      <tr>
        <td
          className="text-center"
          onClick={ this.onUpdateStatus }>{ index }</td>
        <td
          className="text-center"
          onClick={ this.onUpdateStatus }>{ task.name }</td>
        <td
          className="text-center"
          onClick={ this.onUpdateStatus }>
          <span className={ label }>
            { status }
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={ this.onUpdate } >
            <span className="fa fa-pencil mr-2"></span>Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={ this.onDelete } >
            <span className="fa fa-trash mr-2"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default Task;