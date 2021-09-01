import React, { Component } from 'react';
import { fetchNextArrivals, fetchStations } from '../../apiCalls.js';
import './Instructions.css';
import PropTypes from 'prop-types';

class Instructions extends Component { 
  constructor(props){
    super(props);
    this.state = {
      nextArrivals: [],
      stations: [],
      favorited: false,
      lineShortName: '',
    }
  }

  
  nextTrainsArriving = () => {
    const displayNextTimes = this.state.nextArrivals.map((station, index) => {
      return (
      <li key={index}>
        {`-${station.message}`}
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
    const station = this.state.stations.filter((station) => {
      return station.slug === this.props.stationId})
    this.props.addSavedStation(this.props.lineId, station, this.props.stationId, this.props.directionId, this.props.restaurantId)
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

  displayArriving = () => {
    const station = this.state.stations.filter((station) => {
      return station.slug === this.props.stationId})
      console.log(station)
    return `Arriving at ${station[0].name} on Métro Ligne ${this.props.lineId} in...`
  }

  componentDidMount = async () => {
    let nextArrivals = await fetchNextArrivals(this.props.lineId, this.props.stationId, this.props.directionId);
    nextArrivals = nextArrivals.result.schedules;
    let stations = await fetchStations(this.props.lineId);
    stations = stations.result.stations;
    this.checkAlreadySaved()
    this.setState({...this.state, nextArrivals, stations})
  }

  render() {
    return(
    <section className='next-trains'>
      <h2>Upcoming Trains - Chipotle {this.props.displayRestaurantName(this.props.restaurantId)}</h2>
      {!!this.state.stations.length && <p>{this.displayArriving(this.props.stationId)}</p>}
      {!!this.state.stations.length && this.nextTrainsArriving()}
      {!this.state.nextArrivals.length && <h3>Loading...</h3>}
      {!this.state.favorited && <button type='submit' className='favorite-btn' onClick={this.saveStation}>Favorite This Station</button>}
      {this.state.favorited && <button type='submit' className='favorite-btn' onClick={this.removeStation}>Remove Station from Favorites</button>}
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