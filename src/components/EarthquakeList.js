import React, { Component } from 'react';
import moment from 'moment';
// import earthquakes from '../data/earthquakes.js'


export default class EarthquakeList extends Component {
  constructor(props){
    super(props);
    this.state = {
      earthquake: []
    }
  }

  componentDidMount() {
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
    .then(r => r.json() )
    .then((json) => {
      let earthquake = json.features;
      this.setState({earthquake: earthquake})

    })
  }

  render() {
    let eachquake = this.state.earthquake;
    let quakes = eachquake.map((quake) => {
      return (
        <div className="col-sm-6" key={quake.id}>
          <div className="card" >
            <div className="card-block">
              <h4 className="card-title">{quake.properties.title}</h4>
              <h6 className="card-subtitle mb-2 text-muted">Magnitude: {quake.properties.mag}</h6>
              <h6 className="card-subtitle mb-2 text-muted">Time: {moment(quake.properties.time).format('llll')}</h6>
              <p className="card-text">Coordinates: {quake.geometry.coordinates}</p>

              <a href={quake.properties.url} className="card-link">USGS Event Link</a>

            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="quake-list">
        <div className="row">
          {quakes}
        </div>
      </div>
    );
  }
}
