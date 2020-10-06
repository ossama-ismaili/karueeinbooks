import React,{Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            fullname:"",
            image:"",
            username:"",
            email:"",
            password:"",
            error:{check:false, message:""}
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        const imageData = new FormData();        
        imageData.append('image', this.state.image);
        console.log(imageData);
        const user={
            fullname:this.state.fullname,
            image:imageData,
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        };
        fetch(baseUrl+"api/users/register",{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          }
        );
    }

    handleError(){
        if(this.state.error.check) 
            return(
                <Alert color="danger" className="text-center">{this.state.error.message}</Alert>
            );
        else 
            return(<></>);
    }

    render(){
        return(
            <div className="App-register">
                <div className="container">
                    <h1 className="register-title mb-4">Register</h1>
                    {this.handleError()}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label for="fullname" sm={2}>Fullname</Label>
                            <Col sm={10}>
                                <Input type="text" name="fullname" onChange={this.handleChange} value={this.state.fullname} required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="image" sm={2}>Image</Label>
                            <Col sm={10}>
                                <Input type="file" accept="image/*" name="image" onChange={this.handleChange} value={this.state.image} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="username" sm={2}>Username</Label>
                            <Col sm={10}>
                                <Input type="text" name="username" onChange={this.handleChange} value={this.state.username} required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" onChange={this.handleChange} value={this.state.email} required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="password" onChange={this.handleChange} value={this.state.password} required />
                            </Col>
                        </FormGroup>
                        <FormGroup check row className="text-center">
                            <Button type="submit" color="warning" className="col-8 col-md-4">Submit</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Register;