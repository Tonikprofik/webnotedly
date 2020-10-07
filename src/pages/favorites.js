import React, {useEffect} from 'react';

const Favorites = () => {
    useEffect(() => {
        document.title = 'Favorites - Notedly';
    });

    return (
        <div>
            <h1>Notedlyy</h1>
            <p>here are the favorites</p>    
        </div>
    );
};

export default Favorites;
