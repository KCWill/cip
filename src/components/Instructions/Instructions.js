import React, { Component } from 'react';
import { fetchNextArrivals, fetchStations, fetchLines } from '../../apiCalls.js';
import './Instructions.css';
import PropTypes from 'prop-types';

class Instructions extends Component { 
  constructor(props){
    super(props);
    this.state = {
      nextArrivals: [],
      station: [],
      favorited: false,
      lineShortName: '',
    }
  }

  nextTrainsArriving = () => {
    const displayNextTimes = this.state.nextArrivals.map((time, index) => {
      return (
      <li key={index}>
        {`-${time}`}
      </li>
      )
    })
    return (
      <ul>
        {displayNextTimes}
      </ul>
    )
  }
  saveStation = () => {
    this.props.addSavedStation(this.props.lineId, this.state.station[0].name, this.props.stationId, this.props.directionId, this.props.restaurantId)
    this.setState({...this.state, favorited: true})
  }

  removeStation = () => {
    this.props.removeSavedStation(this.props.stationId);
    this.setState({...this.state, favorited: false})
  }
  checkAlreadySaved = () => {
    const previousFavoritedStation = this.props.favorites.filter((favorite) => {
      return ((this.props.stationId === favorite.stationId) && (this.props.restaurantId === favorite.restaurantId))
    })
    const favoritedTF = !!previousFavoritedStation.length;
    this.setState({...this.state, favorited:favoritedTF})
  }


  componentDidMount = async () => {
    const nextArrivals = await fetchNextArrivals(this.props.lineId, this.props.stationId, this.props.directionId);
    const stationsOnLine = await fetchStations(this.props.lineId);
    const station = stationsOnLine.filter((station) => station.id === this.props.stationId)
    const lines = await fetchLines();
    const lineShortName = await lines.filter((line) => {
      return line.id === this.props.lineId
    })[0].shortName;
    
    this.checkAlreadySaved()
    this.setState({...this.state, nextArrivals, station, lineShortName})
  }

  render() {
    return(
    <section className='next-trains'>
      <h2>Upcoming Trains - Chipotle {this.props.displayRestaurantName(this.props.restaurantId)}</h2>
      {this.state.station.length === 1 && <p>{`Arriving at ${this.state.station[0].name} on ${this.state.lineShortName} in...`}</p>}
      {this.state.station.length === 1 && this.nextTrainsArriving()}
      {!this.state.favorited && <button type='submit' className='favorite-btn' onClick={this.saveStation}>Favorite This Station</button>}
      {this.state.favorited && <button type='submit' className='favorite-btn' onClick={this.removeStation}>Remove Station from Favorites</button>}
      {!this.state.nextArrivals.length && <h3>Loading...</h3>}
    </section>
    )
  }
}

export default Instructions;

Instructions.propTypes = {
  restaurantId: PropTypes.string,
  lineId: PropTypes.string,
  stationId: PropTypes.string,
  directionId: PropTypes.string,
  addSavedStation: PropTypes.func,
  removeSavedStation: PropTypes.func,
  displayRestaurantName: PropTypes.func,
  favorites: PropTypes.arrayOf(PropTypes.object)
}