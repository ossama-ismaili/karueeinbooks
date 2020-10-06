import React,{Component} from 'react';
import {Col, Row, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, Alert} from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            passwordView:false,
            error:{check:false, message:""}
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handlePasswordView=this.handlePasswordView.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
        this.setState({error:{check:false, message:""}});
    }

    handleSubmit(event){
        event.preventDefault();
        const user={
            email:this.state.email,
            password:this.state.password
        };
        fetch(baseUrl+"api/users/login",{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          }
        )
        .then(res=>res.json())
        .then(data=>{
            if(data.message){
                throw new Error(data.message);
            }
            localStorage.setItem("username",data.username);
            localStorage.setItem("image",data.image);
            window.location.replace("/home");
        })
        .catch(err=>this.setState({
            error:{check:true,message:err.message}
        }));
    }

    handlePasswordView(){
        this.setState({passwordView:!this.state.passwordView});
    }
    render(){
        const passwordView=()=>(this.state.passwordView?"fa fa-eye-slash":"fa fa-eye");

        const passwordOption=()=>(this.state.passwordView?"text":"password");

        const Errors=()=>{
            if(this.state.error.check){
                return(
                    <Alert color="danger">{this.state.error.message}</Alert>
                );
            }
            else{
                return(<></>);
            }
        }

        return(
            <div className="App-login">
                <div className="container">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <Row>
                            <Col md={12}>
                                <Row>
                                    <div className="col-md-6 d-none d-lg-block bg-login"></div>
                                    <Col className="p-5" lg={6}>
                                        <Errors />
                                        <h2 className="text-center mb-4">Login</h2>
                                        <Form onSubmit={this.handleSubmit}>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="password">Password</Label>
                                                <InputGroup>
                                                    <Input type={passwordOption()} name="password" value={this.state.password} onChange={this.handleChange} />
                                                    <InputGroupAddon addonType="append">
                                                        <Button color="warning" onClick={this.handlePasswordView}><i className={passwordView()}></i></Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormGroup>
                                            <Button className="col-md-12" color="warning" type="submit">Submit</Button>
                                        </Form>
                                        <hr />
                                        <Col md={12} className="my-2 text-center">
                                            <a href="/">Forgot password?</a>
                                        </Col>
                                        <Col md={12} className="my-2 text-center">
                                            You don't have an account? <a href="/register">Sign up now</a>
                                        </Col>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;