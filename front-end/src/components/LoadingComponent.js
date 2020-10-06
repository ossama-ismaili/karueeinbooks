import React from 'react';
import { Spinner } from 'reactstrap';

function Loading(){
    return(
        <div className="App-loading">
            <span className="mr-3">Loading</span>
            <Spinner color="warning" />
        </div>
    );
}

export default Loading;