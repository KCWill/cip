import React, { Component } from 'react';
import Welcome from '../Welcome/Welcome.js';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render () {
        return (
            <main className='app'>
                <section className='top-bar'>
                    <h1>Le Chipôtlé</h1>
                    <button className='saved-trips-btn' type='submit'>
                        View Saved Trips
                    </button>
                </section>
                <Welcome />
            </main>
        )
    }
}

export default App;
