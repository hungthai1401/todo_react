import React, {Component} from 'react';

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    };
  };

  // event when component mount
  componentWillMount() {
    let { task } = this.props;
    if (task) {
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      });
    }
  }

  // event when component receive props
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    } else if (!nextProps.task) {
      this.setState({
        id: '',
        name: '',
        status: false
      });
    }
  }

  // close task
  onCloseCreateTask = () => {
    this.props.onCloseCreateTask();
  };

  // handle event to push form to state
  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name === 'status') {
      value = value === 'true' ? true : false;
    }
    this.setState({
      [name]: value
    })
  };

  // props in parents component
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseCreateTask();
  };

  // clear form
  onClear = () => {
    this.setState({
      name: '',
      status: false
    })
  };

  render() {
    let { id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{ id ? 'Cập nhật công việc' : 'Thêm Công Việc' }
            <span
            className="fa fa-times-circle text-right"
            onClick={ this.onCloseCreateTask }>
            </span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={ this.onSubmit }>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={ this.state.name }
                onChange={ this.onChange } />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              name="status"
              value={ this.state.status }
              onChange={ this.onChange }
              required="required" >
              <option value={ true }>Kích Hoạt</option>
              <option value={ false }>Ẩn</option>
            </select>
            <br/>
            <div className="text-center">
              <button type="submit" className="btn btn-warning">{ id ? 'Cập nhật' : 'Thêm' }</button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={ this.onClear } >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTask;