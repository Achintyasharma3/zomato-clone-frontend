import React from 'react';
import '../Styles/Homepage.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component {
    constructor(){
        super();
        this.state = {
            restaurantList: [],
            searchTxt : undefined,
            suggestions: []
        }
    }
    handlechangeLocation = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);
 
        axios({
         url: `https://backendzom.herokuapp.com/restaurants/${locationId}`,
         method: 'GET',
         headers: { 'Content-Type': 'application/json' }
     })
         .then(res => {
             this.setState({ restaurantList: res.data.restaurants })
         })
         .catch()
     }
     handleInputChange = (event) => {
        const { restaurantList } = this.state;
        const inputText = event.target.value;

        
        let searchRestaurants = [];
        if (inputText) {
            searchRestaurants = restaurantList.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        }

        this.setState({ suggestions: searchRestaurants, inputText });
    }

    selectedText = (resObj) => {
        this.props.history.push(`/details?restaurant=${resObj._id}`);
    }

    renderSuggestions = () => {
        const { suggestions, inputText } = this.state;

        if (suggestions.length == 0 && inputText == "") {
            return <ul className="suggestions" >
                <li className="suggestion_list">No Search Results Found</li>
            </ul>
        }
        return (
            <ul className="suggestions">
                {
                    suggestions.map((item, index) => (<li className="suggestion_list" key={index} onClick={() => this.selectedText(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
                }
            </ul>
        );
    }

   
    
    render() {
        const { locationsData } = this.props;
        const { restaurantList } =this.state;
        
        return (
            <div>
                <img src="./Assets/homepage.png" width="100%" height="440" alt="homepage" />
                <div>
                    {/* Adding Logo */}
                    <div className="logo">
                        <p>E!</p>
                    </div>

                    <div className="headings">
                        Find the best restaurants, cafes,and bars
                    </div>

                    <div className="locationSelector">
                        <select className="locationDropdown" onChange={this.handlechangeLocation}>
                            <option value="0" >Select</option>
                            {locationsData.map((item, index) => {
                                return <option key={index + 1} value={item.location_id} >{`${item.name}, ${item.city}`}</option>
                            })}
                        </select>
                        <div>
                            <span className="glyphicon glyphicon-search search"></span>
                            <div id="notebooks">
                            <input id="query" className="restaurantsinput" type="text" placeholder="Please Enter Restaurant Name" onChange={this.handleInputChange} />
                            {this.renderSuggestions()}
                        </div>
                    </div>
                </div>
            </div>
         </div>
        )
    }
}

export default withRouter(Wallpaper);