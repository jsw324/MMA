const React = require('react');
const axios = require('axios');

class AllFights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount () {
    this.getFights();
  }
  getFights() {
    var requestUrl = 'http://localhost:3500/fights';
    var fights = [];
    axios.get(requestUrl).then((res) => {
      if (!res) {
        throw new Error('unable to retrieve fights');
      } else {
        console.log('React Res', res.data[0].title);
        console.log('this', this.state.title)
        this.setState({
          id: res.data[6].id,
          date: res.data[6].data,
          title: res.data[6].title,
          title_tag: res.data[6].title_tag,
          img: res.data[6].img
        });
      }
    }, function (res) {
      throw new Error('Unable to retrieve fights');
    });
  };
  render() {
    return (
      <div>
        <p>All Fights Component Loaded this time</p>
        <p>{this.state.id}</p>
        <p>{this.state.title}</p>
        <p>{this.state.data}</p>
        <p>{this.state.title_tag}</p>
        <img src={this.state.img}/>
      </div>
    )
  }
};

module.exports = AllFights;
