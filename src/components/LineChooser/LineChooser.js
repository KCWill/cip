import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { fetchLines, fetchStations, fetchDirections } from '../../apiCalls';
import './LineChooser.css';
import restaurantData from '../../RestaurantData.js';


class LineChooser extends Component{
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
            return <NavLink className='station-btn' key={index} to={`/navigate/${this.props.restaurantId}/${line.id}`}>{`${line.shortName} - ${line.name} `}</NavLink>;
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
          Use the map below to find a station near the Chipotle marked with a red star. Locate your nearest station with a line that goes to the Chipotle's station. Finally, choose the direction by looking at the final station on the given line. (e.g. To go to Bir-Hakeim from Raspail, click line M6, then choose Raspail, and finally choose 'Going towards Charles de Gaule Etoile.')
        </p>
        <section className='line-selector-container'>
          <img className='metro-graphic' src={restaurantData[this.props.restaurantId].metroURL} />
          <section className='line-selector'>
            {!this.state.lines.length && <h2>Chargement en cours...</h2>}
            <section className='chooser-column'>
              <h3>
                Métro Lines
              </h3>
              {this.state.lines && this.getAvailableLines()}
            </section>
            <section className='chooser-column'>
              {this.props.lineId && <h3>Stations on Line</h3>}
              {this.props.lineId && this.getStationsOnLine()}
            </section>
            <section className='chooser-column'>
              {this.props.stationId && <h3>Choose Your Direction</h3>}
              {this.props.stationId && this.getMetroDirection()}
            </section>
          </section>
        </section>
      </section>
    )
  }
}
export default LineChooser;