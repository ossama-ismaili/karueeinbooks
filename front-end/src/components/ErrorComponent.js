import React from 'react';

function Error({code}){
    switch (code) {
        case 404:
            return(
                <div className="App-error">
                    <h1>Opps</h1>
                    <p>Error 404 : Page Not Found </p>
                </div>
            );
        default:
            return(
                <div className="App-error">
                    <h1>Opps</h1>
                    <p>Error : Something went wrong </p>
                </div>
            );
    }
}

export default Error;