import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Jumbotron,
    Button
    } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

function Header({user}){
    const [isOpen, setIsOpen] = useState(false);

    const [navStyle,setNavStyle]=useState(false);

    const toggle = () => setIsOpen(!isOpen);

    window.onscroll=()=>{
        const scrollPos=window.pageYOffset;
        if(scrollPos > 0){
            setNavStyle(true);
        }
        else{
            setNavStyle(false);
        }
    }

    const handleStyles=(element)=>{
        switch (element) {
            case "navbar":
                return (navStyle ? "navbar-light navbar-styled-light" : "navbar-dark navbar-styled-dark");
            case "navbar-brand":
                return (navStyle ? "#000" : "#fff");
            case "navbar-find-book":
                return (navStyle ? "navbar-find-book-light" : "navbar-find-book-dark") ; 
            case "navbar-toggler":  
                return (navStyle ? "rgba(0,0,0,.5)" : "rgba(255,255,255,.5)"); 
            case "navbar-user":
                return (navStyle ? "#000" : "#fff"); 
            default:
                console.log("Undefined element in handleStyles()");
                return "";
        }
    }

    const VerifyUser=()=>{
        if(user!==null){
            return(
                <NavLink href="/profile">
                    <div style={{color:handleStyles("navbar-user")}}>
                        <img className="mr-2 rounded" width="35px" height="35px" alt="user img" src={baseUrl+user.image} />
                        <span className="mr-2">{user.username}</span>
                        <Button onClick={()=>localStorage.clear()} color="danger">Logout</Button>
                    </div>
                </NavLink>
            );
        }
        else{
            return(
                <NavLink href="/login">
                    <div className="nav-icon">
                        <i className="fa fa-user"></i>
                    </div>
                </NavLink>
            );
        }
    }

    return (
        <div className="App-header">
            <Navbar expand="md" fixed="top" className={handleStyles("navbar")}>
                <NavbarBrand style={{color:handleStyles("navbar-brand")}} href="/"><span className="fa fa-book"></span> <strong>Karueeinbooks</strong></NavbarBrand>
                <NavbarToggler style={{borderColor:handleStyles("navbar-toggler")}} onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="ml-2">
                            <NavLink href="/books/all">
                                <div className={handleStyles("navbar-find-book")}>
                                    <strong className="noselect"><span className="fa fa-search"></span> Find a book</strong>
                                </div>
                            </NavLink>
                        </NavItem>
                        <NavItem className="ml-2">
                            <NavLink href="/cart">
                                <div className="nav-icon">
                                    <i className="fa fa-shopping-cart"></i>
                                </div>
                            </NavLink>
                        </NavItem>
                        <NavItem className="ml-2">
                            <VerifyUser />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Jumbotron>

            </Jumbotron>
        </div>
    );
}

export default Header;