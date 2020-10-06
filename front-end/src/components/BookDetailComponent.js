import React, { useReducer, useEffect, useState } from 'react';
import { Row, Col, Button, ButtonGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import moment from 'moment';
import Loading from './LoadingComponent';
import Error from './ErrorComponent';
import { useHistory } from 'react-router-dom';

const initialState={
    loading:true,
    quantity:1,
    book:{},
    error:""
}

const reducer=(state, action)=>{
    switch(action.type){
        case "FETCH_SUCCESS":
            return{
                loading:false,
                quantity:1,
                book:action.payload,
                error:""
            };

        case "FETCH_ERROR": 
            return{
                loading:false,
                quantity:1,
                book:{},
                error:"Something went wrong"
            };

        default:
            return state;    
    }
}

function BookDetail({match}){
    const [state, dispatch]=useReducer(reducer,initialState);
    const [quantity, setQuantity]=useState(1);
    const history=useHistory();

    useEffect(()=>{
        fetch(baseUrl+"api/books/"+match.params.id)
        .then(res=>{
            if(res.ok) return res.json()
            else throw new Error("Problem in the server")
        })
        .then(data=> dispatch({type:"FETCH_SUCCESS", payload:data}) )
        .catch(err=> dispatch({type:"FETCH_ERROR"}) );
    },[state.loading,match.params.id]);
    
    const onAddToCart=(book,quantity)=>{
        var data={
            quantity : quantity,
            book : book
        };

        fetch(baseUrl+"api/users/cart",{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
        );

        history.push("/cart");
    }

    const onChangeQuantity=(event)=>{
        event.persist();
        setQuantity(event.target.value);
    }

    const incrementQuantity=()=>{
        setQuantity(quantity+1);
    }

    const decrementQuantity=()=>{
        setQuantity(quantity-1);
    }

    const BookInfo=()=>{
        if(state.error){
            return <Error code={404} />;
        }
        else if(state.loading){
            return <Loading />;
        }
        else{
            return(
                <>
                    <Row>
                        <Col md={12}>
                            <h2>{state.book.title}</h2>
                            <h3>by {state.book.author.name}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <img src={baseUrl+state.book.image} alt="book img" className="col-md-4" />
                        <Col md={8}>
                            <Row>
                                <div className="book-price col-12 mt-3">
                                    Price <span className="float-right">{state.book.price} $</span>
                                </div>
                                <div className="book-quantity col-12 mt-3">
                                    Quantity 
                                    <span className="float-right">
                                        <InputGroup className="mt-2">
                                            <InputGroupAddon addonType="prepend">
                                                <Button onClick={()=>decrementQuantity()}>-</Button>
                                            </InputGroupAddon>
                                            <Input type="text" className="text-center" onChange={onChangeQuantity} value={quantity} />
                                            <InputGroupAddon addonType="append">
                                                <Button onClick={()=>incrementQuantity()}>+</Button>
                                            </InputGroupAddon>
                                        </InputGroup>  
                                    </span>
                                </div>
                                <Col md={6} className="mt-3">
                                    <table>
                                        <tr>
                                            <td className="pr-2 py-3">Author</td>
                                            <td className="pr-2 py-3"><img className="rounded mr-2" alt="author img" src={baseUrl+state.book.author.image} width="50px" /><span></span>{state.book.author.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-2 py-3">ISBN</td>
                                            <td className="pr-2 py-3">{state.book.isbn}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-2 py-3">Language</td>
                                            <td className="pr-2 py-3">{state.book.language}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-2 py-3">Release date</td>
                                            <td className="pr-2 py-3">{moment(state.book.release_date).format("DD MMM YYYY")}</td>
                                        </tr>
                                    </table>
                                </Col>
                                <Col md={6} className="mt-3 p-0">
                                    <ButtonGroup vertical className="col-12">
                                        <Button color="success" className="text-left"><span className="fa fa-money mr-2"></span> Buy now</Button>
                                        <Button color="primary" className="text-left" onClick={()=>onAddToCart(state.book,quantity)}><span className="fa fa-shopping-cart mr-2"></span> Add to cart</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            );
        }
    }

    return(
        <div className="App-book-info">
            <div className="container">
                <BookInfo />
            </div>
        </div>
    );
}

export default BookDetail;