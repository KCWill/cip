import React, { Component } from 'react';
import { fetchNextArrivals, fetchStationData } from '../../apiCalls.js';
import './Instructions.css'

class Instructions extends Component { 
  constructor(){
    super();
    this.state = {
      nextArrivals: [],
      station: [],
      favorited: false,
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
    const stationsOnLine = await fetchStationData(this.props.lineId);
    const station = stationsOnLine.filter((station) => station.id === this.props.stationId)
    this.checkAlreadySaved()
    this.setState({...this.state, nextArrivals, station})
  }

  render() {
    return(
    <section className='next-trains'>
      <h2>Next Trains Leaving for Chipotle {this.props.displayRestaurantName(this.props.restaurantId)}</h2>
      {this.state.station.length === 1 && <p>{`The next trains arriving at ${this.state.station[0].name}:`}</p>}
      {this.state.station.length === 1 && this.nextTrainsArriving()}
      {!this.state.favorited && <button type='submit' className='favorite-btn' onClick={this.saveStation}>Favorite This Station</button>}
      {this.state.favorited && <button type='submit' className='favorite-btn' onClick={this.removeStation}>Remove Station from Favorites</button>}
      {!this.state.nextArrivals.length && <h3>Chargement en cours...</h3>}
    </section>
    )
  }
}

export default Instructions;