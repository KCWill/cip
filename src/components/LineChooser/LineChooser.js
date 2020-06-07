import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { getLines } from '../../apiCalls';


class LineChooser extends Component{
  constructor(props){
    super(props);
    this.state = {
      lines: [],
    };
  }

  getAvailableLines = () => {
    const linesToDisplay = this.state.lines.map((line, index) => {
            return <NavLink key={index} to={`/navigate/${this.props.restaurantId}/${line.shortName}`}>{line.name}</NavLink>;
          })
    return linesToDisplay
  }

  getStationsOnLine = () => {
    const stationsOnLine = this.state.lines.map((line, index) => {
      return <NavLink key={index} to={`/navigate/${this.props.restaurantId}/${line.shortName}`}>{line.name}</NavLink>;
    })
    return stationsOnLine
  }

  componentDidMount = async () => {
    const lines = await getLines();
    this.setState({...this.state, lines});
  }

  render() {
    return(
      <section>
        <h2>Line Chooser</h2>
        <h3>{this.props.restaurantId}</h3>
        {this.props.lineId && this.getStationsOnLine()}
      </section>
    )
  }
}
export default LineChooser;