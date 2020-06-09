import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { fetchLines, fetchStations, fetchDirections } from '../../apiCalls';


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
            return <NavLink key={index} to={`/navigate/${this.props.restaurantId}/${line.id}`}>{`${line.shortName} - ${line.name} `}</NavLink>;
          })
    return linesToDisplay
  }

  getStationsOnLine = () => {
    const stationsOnLine = this.state.stations.map((station, index) => {
      return <NavLink key={index} to={`/navigate/${this.props.restaurantId}/${this.props.lineId}/${station.id}`}>{station.name}</NavLink>;
    })
    return stationsOnLine
  }

  getMetroDirection = () => {
    const trainDirection = this.state.directions.map((direction, index)=>{
    return <NavLink key={index} to={`/navigate/${this.props.restaurantId}/${this.props.lineId}/${this.props.stationId}/${direction.way}`}>{`Going towards ${direction.name}`}</NavLink>
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
        <h2>Line Chooser</h2>
        <h3>{this.props.restaurantId}</h3>
        {!this.state.lines.length && <h2>Chargement en cours...</h2>}
        {this.state.lines && this.getAvailableLines()}
        <br/>
        <br/>
        {this.props.lineId && this.getStationsOnLine()}
        <br/>
        <br/>
        {this.props.stationId && this.getMetroDirection()}
      </section>
    )
  }
}
export default LineChooser;