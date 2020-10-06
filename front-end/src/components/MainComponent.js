import React,{ useState, useEffect } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Login from './LoginComponent';
import Home from './HomeComponent';
import Books from './BooksComponent';
import Cart from './CartComponent';
import BookDetail from './BookDetailComponent';
import Register from './RegisterComponent';

function Main(){
    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        const username = localStorage.getItem("username");
        const image = localStorage.getItem("image");
        if (username) {
            setUser({
                username:username, 
                image:image
            });
        }
        setLoading(false);
    },[loading]);

    return(
        <div className="App-main">
            <Header user={user} />
            <Switch>
                <Route path="/home"> 
                    <Home />
                </Route>
                <Route path="/about"> 
                    <div className="test-container">About us</div>
                </Route>
                <Route path="/books/all"> 
                    <Books />
                </Route>
                <Route path="/books/id/:id" component={BookDetail} />
                <Route path="/cart"> 
                    <Cart user={user} />
                </Route>
                <Route path="/login"> 
                    <Login />
                </Route>
                <Route path="/register"> 
                    <Register />
                </Route>
                <Route path="/contact"> 
                    <div className="test-container">Contact us</div>
                </Route>
                <Redirect to="/home" />
            </Switch>
            <Footer />
        </div>
    );
}

export default Main;