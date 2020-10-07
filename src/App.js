// index.js
// This is the main entry point of our application

import React from 'react';
import ReactDOM from 'react-dom';

//imp Routes
import Pages from '/pages';

const App = () => {
    return (
        <div>
            <Pages/>    
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));