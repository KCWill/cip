import React, { Component } from 'react';
import { fetchNextArrivals, fetchStationData } from '../../apiCalls.js';

class Instructions extends Component { 
  constructor(){
    super();
    this.state = {
      nextArrivals: [],
      station: [],
    }
  }

  nextTrainsArriving = () => {
    const displayNextTimes = this.state.nextArrivals.map((time, index) => {
      return (
      <li key={index}>
        {time}
      </li>
      )
    })
    return (
      <ul>
        {displayNextTimes}
      </ul>
    )
  }

  componentDidMount = async () => {
    const nextArrivals = await fetchNextArrivals(this.props.lineId, this.props.stationId, this.props.directionId);
    const stationsOnLine = await fetchStationData(this.props.lineId);
    const station = stationsOnLine.filter((station) => station.id === this.props.stationId)
    this.setState({...this.state, nextArrivals, station})
  }
  render() {
    return(
    <section>
      <h2>Instructions</h2>
      {this.state.station.length === 1 && <p>{`The next trains arriving at ${this.state.station[0].name}:`}</p>}
      {this.state.station.length === 1 && this.nextTrainsArriving()}
    </section>
    )
  }
}

export default Instructions;