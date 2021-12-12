import React from 'react';
import '../Styles/Homepage.css';
import { withRouter } from 'react-router-dom';

class QuickSearchItem extends React.Component {
    handleNavigate = (mealTypeId) => {
        const locationId = sessionStorage.getItem('locationId');
        if (locationId) {
            this.props.history.push(`/filter?mealtype=${mealTypeId}&location=${locationId}`);  
        }
        this.props.history.push(`/filter?mealtype=${mealTypeId}`);
    }

    render() {
        const { QSItemData } = this.props;
        return (
            <div key={QSItemData._id} className="col-sm-12 col-md-6 col-lg-4" onClick={() => this.handleNavigate(QSItemData.meal_type)}>
                <div className="tileContainer">
                    <div className="tileComponent1">
                        <img src={`./${QSItemData.image}`} height="150" width="140" alt="qsitem" />
                    </div>
                    <div className="tileComponent2">
                        <div className="componentHeading">
                            {QSItemData.name}
                        </div>
                        <div className="componentSubHeading">
                            {QSItemData.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(QuickSearchItem);