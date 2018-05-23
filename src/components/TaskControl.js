import React, {Component} from 'react';

class TaskControl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchName: ''
    };
  }

  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  };

  onSearch = () => {
    this.props.onSearch(this.state.searchName);
  };

  render() {
    return (
      <div className="row mb-3">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Nhập từ khóa..." name="searchName" onChange={ this.onChange } />
            <span className="input-group-btn">
                <button className="btn btn-primary ml-3" type="button" onClick={ this.onSearch } >
                  <span className="fa fa-search mr-2"></span>Tìm
                </button>
              </span>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskControl;