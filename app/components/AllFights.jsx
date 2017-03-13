const React = require('react');
const axios = require('axios');
const moment = require('moment')
const {Link} = require('react-router');
const Event = require('Event');

class AllFights extends React.Component {
  constructor(props) {
    super(props);
    this.getFights();
    this.state = {fights: []};
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
        var data = res.data;
        this.setState({ fights: data});
      }
    }, function (res) {
      throw new Error('Unable to retrieve fights');
    });
  };

  render() {
    console.log('data 1', this.state.fights);
    const items = this.state.fights.reverse().map((item, i) => {
      console.log('item', item.date);
      return <div className="row">
        <div className="column small-centered medium-6 large-6">
        <div className="card align-center" style={{width:500}}>
          <div className="card-divider">
            <h4 className="text-center">{item.title_tag}</h4>
            <p className="text-center">{item.title}</p>
          </div>
          <Link to="/event"><img className="align-center" src={item.img}/></Link>
          <div className="card-section">
            <p>{moment.utc(item.date).format('dddd, MMMM Do YYYY')}</p>
          </div>
        </div>
      </div>
    </div>
    });
    return <div>
      <h1 className="text-center">Upcoming Fights</h1>
      <div>{ items }</div>
    </div>
  }
};

module.exports = AllFights;
