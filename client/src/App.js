import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
   
    

    fetch("/createtable", {
	
	// Adding method type
	method: "POST",
	
	// Adding body or contents to send
	body: JSON.stringify({
		tablename: "bow2",
	}),
	
	// Adding headers to the request
	headers: {
		"Content-type": "application/json",
    "Accept":"application/json",
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Request-Headers":"*",
   }
})
.then(response => response.json())
.then(json => console.log(json));


// const response = await fetch('/createtable');
//     const body = await response.json();
//     console.log(body);
//     if (response.status !== 200) {
//       throw Error(body.message) 
//     }
//     return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Reactttt</h1>
        </header>
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;