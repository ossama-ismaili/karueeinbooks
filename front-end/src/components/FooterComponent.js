import React from 'react';
import {Row, Col} from 'reactstrap';

function Footer(){
    return(
        <div className="App-footer">
            <footer>
                <div className="container">
                    <Row>
                        <Col md={6}>
                            <ul className="list-unstyled">
                                <li className="list-element mb-1">
                                    <a href="/about">About</a>
                                </li>
                                <li className="list-element mb-1">
                                    <a href="/register">Become An Affiliate</a>
                                </li>
                                <li className="list-element mb-1">
                                    <a href="/contact">Contact</a>
                                </li>
                                <li className="list-element mb-1">
                                    <a href="/">Terms Of Use</a>
                                </li>
                                <li className="list-element mb-1">
                                    <a href="/">Privacy Notice</a>
                                </li>
                                <li className="list-element mb-1">
                                    <a href="/register">Bookshop For Authors</a>
                                </li>
                                <li className="list-element mb-1">
                                    <ul className="media-list list-inline">
                                        <li className="mr-3">
                                            <a href="https://facebook.com/"><i className="fa fa-facebook"></i></a>
                                        </li>
                                        <li className="mr-3">
                                            <a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a>
                                        </li>
                                        <li className="mr-3">
                                            <a href="https://www.twitter.com/"><i className="fa fa-twitter"></i></a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="/login" className="btn btn-footer bg-older mr-2">Login</a>
                                    <a href="/register" className="btn btn-footer bg-older">Register</a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={6}>
                            <h1 className="footer-title">
                                <a href="/">Karueeinbooks</a>
                            </h1>
                            <div className="input-group mt-5">
                                <input type="text" placeholder="Search" className="form-control"  />
                                <div className="input-group-append">
                                    <button className="input-group-text bg-older"><i className="fa fa-search text-white"></i></button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </footer>
        </div>
    );
}

export default Footer;