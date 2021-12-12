import React from 'react';
import '../Styles/Filter.css';
import queryString from 'query-string';
import axios from 'axios';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            pageCount: [],
            locations: [],
            mealtype: undefined,
            location: undefined,
            cuisine: [],
            sort: undefined,
            lcost: undefined,
            hcost: undefined,
            page: undefined
        }
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, location } = qs;

        const filterObj = {
            mealtype:mealtype,
            location:location
        };

        axios({
            url: 'https://backendzom.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurants: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    mealtype
                })
            })
            .catch()

        axios({
            url: 'https://backendzom.herokuapp.com/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ locations: res.data.locations})
            })
            .catch()
    }

    handleLocationChange = (event) => {
        const { mealtype, cuisine, sort, page, lcost, hcost } = this.state;
        const locationId = event.target.value;

        const filterObj = {
            mealtype: mealtype,
            location: locationId,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lcost,
            hcost,
            page,
            sort
        };

        axios({
            url: 'https://backendzom.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurants: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    location: locationId
                })
            })
            .catch()

        this.props.history.push(`/filter?mealtype=${mealtype}&location=${locationId}`);
    }

    handleSortChange = (sort) => {
        const { mealtype, cuisine, location, page, lcost, hcost } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lcost,
            hcost,
            page,
            sort
        };

        axios({
            url: 'https://backendzom.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurants: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    sort: sort
                })
            })
            .catch()

        this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}&sort=${sort}`);

    }

    handleCostChange = (lcost, hcost) => {
        const { mealtype, cuisine, location, page, sort } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lcost,
            hcost,
            page,
            sort
        };

        axios({
            url: 'https://backendzom.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurants: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    lcost,
                    hcost
                })
            })
            .catch()

         this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}&sort=${sort}`);
    }

    handleCuisineChange = (cuisineId) => {
        const { mealtype, location, cuisine, page, sort, lcost, hcost } = this.state;

        const index = cuisine.indexOf(cuisineId);
        if (index >= 0) {
            cuisine.splice(index, 1);
        }
        else {
            cuisine.push(cuisineId);
        }

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lcost,
            hcost,
            page,
            sort
        };

        axios({
            url: 'https://backendzom.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurants: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    cuisine
                })
            })
            .catch()
    }

    handleNavigate = (resId) => {
        this.props.history.push(`/details?restaurant=${resId}`);
    }

    render() {
        const { restaurants, pageCount, locations } = this.state;
        return (
            <div>
                <div>
                    <div id="myId" className="heading">Breakfast Places in Mumbai</div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                                <div className="filter-heading">Filters / Sort</div>
                                <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                    data-target="#filter"></span>
                                <div id="filter" className="collapse show">
                                    <div className="Select-Location">Select Location</div>
                                    <select onChange={this.handleLocationChange}>
                                        <option value="0" >Select</option>
                                        {locations.map((item, index) => {
                                            return <option key={index + 1} value={item.location_id} >{`${item.name}, ${item.city}`}</option>
                                        })}
                                    </select>
                                    <div className="Cuisine">Cuisine</div>
                                    <div>
                                        <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange(1)} />
                                        <span className="checkbox-items">North Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange(2)} />
                                        <span className="checkbox-items">South Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange(3)} />
                                        <span className="checkbox-items">Chineese</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange(4)} />
                                        <span className="checkbox-items">Fast Food</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange(5)} />
                                        <span className="checkbox-items">Street Food</span>
                                    </div>
                                    <div className="Cuisine">Cost For Two</div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)} />
                                        <span className="checkbox-items">Less than &#8377; 500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(500, 1000)} />
                                        <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1000, 1500)} />
                                        <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1500, 2000)} />
                                        <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(2000, 50000)} />
                                        <span className="checkbox-items">&#8377; 2000 +</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 50000)} />
                                        <span className="checkbox-items">All</span>
                                    </div>
                                    <div className="Cuisine">Sort</div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(1)} />
                                        <span className="checkbox-items">Price low to high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)} />
                                        <span className="checkbox-items">Price high to low</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-8">

                                {restaurants && restaurants.length > 0 ? restaurants.map((item) => {
                                    return <div className="Item" onClick={() => this.handleNavigate(item._id)}>
                                        <div>
                                            <div className="small-item vertical">
                                                <img className="img" src={`./${item.image}`} />
                                            </div>
                                            <div className="big-item">
                                                <div className="rest-name">{item.name}</div>
                                                <div className="rest-location">{item.locality}</div>
                                                <div className="rest-address">{item.city}</div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <div className="margin-left">
                                                <div className="Bakery">CUISINES : {item.cuisine.map((cuisine) => `${cuisine.name}, `)}</div>
                                                <div className="Bakery">COST FOR TWO : &#8377; {item.min_price} </div>
                                            </div>
                                        </div>
                                    </div>
                                }) : 
                                <div className="no-records">No Records Found !!!</div>}

                                {restaurants && restaurants.length > 0 ?
                                    <div className="pagination">
                                        <span className="page-num">&laquo;</span>
                                        {pageCount.map((page) => {
                                            return <span className="page-num">{page}</span>
                                        })}
                                        <span className="page-num">&raquo;</span>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Filter;