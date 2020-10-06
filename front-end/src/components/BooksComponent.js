import React, {useReducer, useEffect} from 'react';
import { Card, CardBody, CardImg, CardTitle, CardSubtitle } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Stagger, Fade } from 'react-animation-components';
import Loading from './LoadingComponent';
import Error from './ErrorComponent';

const initialState={
    loading:true,
    books:[],
    error:""
}

const reducer=(state, action)=>{
    switch(action.type){
        case "FETCH_SUCCESS":
            return{
                loading:false,
                books:action.payload,
                error:""
            };

        case "FETCH_ERROR": 
            return{
                loading:false,
                books:[],
                error:"Something went wrong"
            };

        default:
            return state;    
    }
}

const Book=({book})=>{
    return(
        <div className="App-book mt-2">
            <Card>
                <a href={"/books/id/"+book._id.toString()}>
                    <div className="image-container">
                        <figure>
                            <CardImg top width="100%" height="400px" src={baseUrl+book.image} />
                        </figure>
                        <div className="book-img-middle">
                            <i className="book-icon fa fa-shopping-bag"></i>
                        </div>
                    </div>
                </a>
                <CardBody>
                    <CardTitle>{book.title}</CardTitle>
                    <CardSubtitle><img className="rounded mr-2" alt="author img" src={baseUrl+book.author.image} width="50px" />{book.author.name}</CardSubtitle>
                </CardBody>
            </Card>
        </div>
    );
}


function Books(){
    const [state, dispatch]=useReducer(reducer,initialState);

    useEffect(()=>{
        fetch(baseUrl+"api/books")
        .then(res=>{
            if(res.ok) return res.json()
            else throw new Error("Problem in the server")
        })
        .then(data=> dispatch({type:"FETCH_SUCCESS", payload:data}) )
        .catch(err=> dispatch({type:"FETCH_ERROR"}) );
    },[state.loading]);

    const RenderBook=()=>{
        if(state.error){
            return <Error />;
        }
        else if(state.loading){
            return <Loading />;
        }
        else{
            const renderBooks=state.books.map(
                book=>{
                    return(
                        <Fade key={book._id.toString()} className="col-sm-6 col-md-4 col-lg-3">
                            <Book book={book} />
                        </Fade>
                    );
                }
            );
            return(
                <Stagger className="row" in>
                    {renderBooks}  
                </Stagger>
            );
        }
    }

    return(
        <div className="App-books">
            <section className="section-recommend mb-3">
                <div className="container">
                    <RenderBook />
                </div>
            </section>
        </div>
    );
}

export default Books;