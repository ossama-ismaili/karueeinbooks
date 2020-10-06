import React, {useState, useReducer, useEffect} from 'react';
import { Col, Row, Carousel, CarouselItem, CarouselControl, CarouselIndicators, Card, CardBody, CardImg, CardTitle, CardSubtitle } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import Error from './ErrorComponent';

const initialState={
    loading:true,
    items:[],
    error:""
}

const reducer=(state, action)=>{
    switch(action.type){
        case "FETCH_SUCCESS":
            return{
                loading:false,
                items:action.payload,
                error:""
            };

        case "FETCH_ERROR": 
            return{
                loading:false,
                items:[],
                error:"Something went wrong"
            };

        default:
            return state;    
    }
}


const Book=({book})=>{
    return(
        <div className="recommend-book">
            <Card>
                <a href={"/books/id/"+book._id.toString()}>
                    <div className="image-container">
                        <CardImg top width="100%" height="400px" src={baseUrl+book.image} />
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


function Home(){
    const [state, dispatch]=useReducer(reducer,initialState);

    useEffect(()=>{
        fetch(baseUrl+"api/books")
        .then(res=>{
            if(res.ok) return res.json()
            else throw new Error("Problem in the server")
        })
        .then(data=> dispatch({type:"FETCH_SUCCESS", payload:data.splice(0,3)}) )
        .catch(err=> dispatch({type:"FETCH_ERROR"}) );
    },[state.loading]);

    const Items=()=>{
        const [activeIndex, setActiveIndex] = useState(0);
        const [animating, setAnimating] = useState(false);
        
        if(state.error){
            return <Error />;
        }
        else if(state.loading){
            return <Loading />;
        }
        else{
            const next = () => {
                if (animating) return;
                const nextIndex = activeIndex === state.items.length - 1 ? 0 : activeIndex + 1;
                setActiveIndex(nextIndex);
            }
            
            const previous = () => {
                if (animating) return;
                const nextIndex = activeIndex === 0 ? state.items.length - 1 : activeIndex - 1;
                setActiveIndex(nextIndex);
            }
            
            const goToIndex = (newIndex) => {
                if (animating) return;
                setActiveIndex(newIndex);
            }
            
            const slides = state.items.map((item) => {
                return (
                    <CarouselItem key={item._id} onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)}>
                        <Col className="mx-auto" lg={4} md={6} sm={8}>
                            <Book book={item} />
                        </Col>
                    </CarouselItem>
                );
            });

            return(
                <Row>
                    <Col md={12}>
                        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                            <CarouselIndicators items={state.items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                                {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                        </Carousel>
                    </Col>
                </Row>
            );
        }
    }

    return(
        <div className="App-home">
            <section className="section-recommend mb-3">
                <h2 className="mb-5"><span className="fa fa-star"></span> Recommended Books</h2>
                <div className="container">
                    <Items />
                </div>
            </section>
        </div>
    );
}

export default Home;