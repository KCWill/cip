import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { fetchLines, fetchStations, fetchDirections } from '../../apiCalls';
import './LineChooser.css';
import restaurantData from '../../RestaurantData.js';
import PropTypes from 'prop-types';


class LineChooser extends Component {
  constructor(props){
    super(props);
    this.state = {
      lines: [],
      stations: [],
      directions: [],
    };
  }

  getAvailableLines = () => {
    const linesToDisplay = this.state.lines.map((line, index) => {
            return <NavLink className='station-btn' key={index} exact to={`/navigate/${this.props.restaurantId}/${line.id}`}>{`${line.shortName} - ${line.name} `}</NavLink>;
          })
    return linesToDisplay
  }

  getStationsOnLine = () => {
    const stationsOnLine = this.state.stations.map((station, index) => {
      return <NavLink className='station-btn' key={index} to={`/navigate/${this.props.restaurantId}/${this.props.lineId}/${station.id}`}>{station.name}</NavLink>;
    })
    return stationsOnLine
  }

  getMetroDirection = () => {
    const trainDirection = this.state.directions.map((direction, index)=>{
    return <NavLink className='station-btn' key={index} to={`/navigate/${this.props.restaurantId}/${this.props.lineId}/${this.props.stationId}/${direction.way}`}>{`Going towards ${direction.name}`}</NavLink>
    })
    return trainDirection
  }

  displayLineShortName = (lineId) => {
    const lineName = this.state.lines.filter((line) => {
      return line.id === lineId
    })
    return lineName[0].shortName
  }

  displayStationName = (stationId) => {
    const stationName = this.state.stations.filter((station) => {
      return station.id === stationId
    })
    return stationName[0].name
  }

  componentDidMount = async () => {
    const lines = await fetchLines();
    const stations = await fetchStations(this.props.lineId);
    const directions = await fetchDirections(this.props.lineId);
    this.setState({...this.state, lines, stations, directions})
  }


  render() {
    return(
      <section>
        <h2>Métro Station Selector</h2>
        <h3>
          {restaurantData[this.props.restaurantId].name}
        </h3>
        <p className='directions'>
          Use the map below to find a station near the Chipotle marked with a red star. Select a numbered line that goes from your location to a station near the Chipotle. Do not choose a line that is labeled as a single letter, as it is a RER train which has different tickets. Select a station near your location. Finally, choose the direction by looking at the final station on the given line. (e.g. To go to Bir-Hakeim from Raspail, click line M6, select Raspail, and finally select 'Going towards Charles de Gaule Etoile.')
        </p>
        <section className='line-selector-container'>
          <img alt='Paris Metro Map' className='metro-graphic' src={process.env.PUBLIC_URL + restaurantData[this.props.restaurantId].metroURL} />
          {!this.state.lines.length && <h2>Loading...</h2>}
          <section className='line-selector'>
            <section className='chooser-column'>
              <h3>
                Métro Lines
              </h3>
              {this.state.lines && this.getAvailableLines()}
            </section>
            <section className='chooser-column'>
              {this.props.lineId && !!this.state.lines.length && <h3>{`Stations on Line ${this.displayLineShortName(this.props.lineId)}`}</h3>}
              {this.props.lineId && this.getStationsOnLine()}
            </section>
            <section className='chooser-column'>
              {this.props.stationId && !!this.state.directions.length && <h3>{`Choose Direction Leaving from ${this.displayStationName(this.props.stationId)}`}</h3>}
              {this.props.stationId && this.getMetroDirection()}
            </section>
          </section>
        </section>
      </section>
    )
  }
}
export default LineChooser;

LineChooser.propTypes = {
  restaurantId: PropTypes.string,
  lineId: PropTypes.string,
  stationId: PropTypes.string,
}