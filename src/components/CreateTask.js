import React, {Component} from 'react';

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: false
    };
  };

  // close task
  onCloseCreateTask = () => {
    this.props.onCloseCreateTask();
  };

  // handle event to push form to state
  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
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
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">Thêm Công Việc
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
              <button type="submit" className="btn btn-warning">Thêm</button>
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