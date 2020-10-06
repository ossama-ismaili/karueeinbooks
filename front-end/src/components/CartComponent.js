import React, {useReducer, useEffect} from 'react';
import { Col, Row, Media, ButtonGroup, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Stagger, Fade } from 'react-animation-components';
import {baseUrl} from '../shared/baseUrl';
import Loading from './LoadingComponent';
import Error from './ErrorComponent';


const initialState={
    loading:true,
    cart:[],
    error:""
}

const reducer=(state, action)=>{
    switch(action.type){
        case "FETCH_SUCCESS":
            return{
                loading:false,
                cart:action.payload,
                error:""
            };

        case "FETCH_ERROR": 
            return{
                loading:false,
                cart:[],
                error:"Something went wrong"
            };

        case "DELETE_CART":
            return{
                cart: state.cart.filter((item) => item._id !== action.payload)
            };

        case "ADD_QUANTITY":
            return{
                cart:state.cart.map(item=>{
                    if(item.id===action.payload){
                        item.quantity+=1;
                        return item
                    }
                    return item;
                })
            }

        case "REDUCE_QUANTITY":  
            return{
                cart:state.cart.map(item=>{
                    if(item.id===action.payload){
                        item.quantity-=1;
                        return item
                    }
                    return item;
                })
            }

        default:
            return state;    
    }
}

function Cart({user}){
    const [state, dispatch]=useReducer(reducer,initialState);

    useEffect(()=>{
        fetch(baseUrl+"api/users/cart")
        .then(res=>{
            if(res.ok) return res.json()
            else throw new Error("Problem in the server")
        })
        .then(data=> dispatch({type:"FETCH_SUCCESS", payload:data}) )
        .catch(err=> dispatch({type:"FETCH_ERROR"}) );
    },[state.loading]);

    const onDeleteCart=(id)=>{
        fetch(baseUrl+`api/users/cart/${id}`,{
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        dispatch({type:"DELETE_CART", payload:id});
    }

    const onAddQuantity=(id)=>{
        const quantity=state.cart.filter((item)=>item._id===id)[0].quantity+1;
        fetch(baseUrl+`api/users/cart/${id}`,{
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity:quantity})
          }
        );
        dispatch({type:"ADD_QUANTITY", payload:id});
    }

    const onReduceQuantity=(id)=>{
        const quantity=state.cart.filter((item)=>item._id===id)[0].quantity-1;
        fetch(baseUrl+`api/users/cart/${id}`,{
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity:quantity})
          }
        );
        dispatch({type:"REDUCE_QUANTITY", payload:id});
    }

    const RenderCart=()=>{
        if(user===null){
            return  (
            <div className="App-error">
                <p>Try login first : <a className="btn btn-warning" href="/login">Login</a></p>
            </div>
        );
        }
        if(state.error){
            return <Error />;
        }
        else if(state.loading){
            return <Loading />;
        }
        else{
            if(state.cart.length>0){
                const renderCart=state.cart.map(item=>{
                    return <Fade>
                        <div key={item._id.toString()} className="cart-item row">  
                            <Col lg={10} md={8}>
                                <Media>
                                    <Media className="mr-2" left>
                                        <Media object width="60vh" height="100vh" src={baseUrl+item.book.image} alt="Book img" />
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            {item.book.title}
                                        </Media>
                                    </Media>
                                </Media>
                            </Col>
                            <Col lg={2} md={4} className="text-right">
                                <ButtonGroup vertical>
                                    <Button color="success">Buy</Button>
                                    <Button color="danger" onClick={()=>onDeleteCart(item._id.toString())}>Delete</Button>
                                </ButtonGroup>
                                <InputGroup className="mt-2">
                                    <InputGroupAddon addonType="prepend">
                                        <Button onClick={()=>onReduceQuantity(item._id.toString())}>-</Button>
                                    </InputGroupAddon>
                                    <Input type="text" className="text-center" value={item.quantity} />
                                    <InputGroupAddon addonType="append">
                                        <Button onClick={()=>onAddQuantity(item._id.toString())}>+</Button>
                                    </InputGroupAddon>
                                </InputGroup>  
                            </Col>
                        </div>
                    </Fade>
                    }
                );
                        
                return (
                    <Row>
                        <Col md={12}>
                            <h2>Your Cart</h2>
                                <div className="user-cart">
                                    <Stagger in>
                                        {renderCart}
                                    </Stagger>
                                </div>
                        </Col>
                    </Row>
                );
            }
            else{
                return(
                    <Row>
                        <Col md={12}>
                            <h2>Your Cart</h2>
                            <div className="user-cart">
                                <p>Your cart is empty</p>
                            </div>
                        </Col>
                    </Row>        
                );
            }
        }
    }
    
    return(
        <div className="App-cart">
            <div className="container">
                <RenderCart />
            </div>
        </div>
    );
}

export default Cart;