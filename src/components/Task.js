import React, {Component} from 'react';

class Task extends Component {
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

  render() {
    let { index, task } = this.props;
    let { label, status } = this.generateStatus(task.status);
    return (
      <tr>
        <td className="text-center">{ index }</td>
        <td className="text-center">{ task.name }</td>
        <td className="text-center">
          <span className={ label }>
            { status }
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning">
            <span className="fa fa-pencil mr-2"></span>Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger">
            <span className="fa fa-trash mr-2"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default Task;