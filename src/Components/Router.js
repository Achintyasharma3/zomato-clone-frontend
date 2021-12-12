import {BrowserRouter , Route} from 'react-router-dom';
import Homepage from './Homepage';
import Filterpage from './Filterpage';
import Details from './Details';
import Header from './Header';

function Router () {
    return(
        <div>
            <BrowserRouter>
            <Header/>
                 <Route exact path='/' component={Homepage} />
                <Route path='/filter' component={Filterpage} />
                <Route path='/details' component={Details} />
            </BrowserRouter>
         </div>
    )
}


export default Router;