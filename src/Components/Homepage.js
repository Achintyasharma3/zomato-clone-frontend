import React from 'react';
import axios from 'axios';
import Wallpaper from './Wallpaper';
import QuickSeach from './Quicksearch';

class Homepage extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            quickSearchItems: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            url: 'https://backendzom.herokuapp.com/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ locations: res.data.locations })
            })
            .catch()

        axios({
            url: 'https://backendzom.herokuapp.com/mealtypes',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ quickSearchItems: res.data.mealtype })
            })
            .catch()
    }

    render() {
        const { locations, quickSearchItems } = this.state;
        return (
            <div>
                <Wallpaper locationsData={locations} />
                <QuickSeach quickSearchItemsData={quickSearchItems} />
            </div>
        )
    }
}

export default Homepage;