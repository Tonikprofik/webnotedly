import React from 'react';

import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Notedly</h1>
            <p>Home page is here</p>    

            {/*todo:add list of links */}
            <ul>
                <li>
                    <Link to="/mynotes">My Nootes</Link>
                </li>
                <li>
                    <Link to= "/favorites">Favoritess</Link>
                </li>
            </ul>    
        </div>
    );
};

export default Home;