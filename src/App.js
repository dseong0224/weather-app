import React from 'react';

import Titles from "./components/titles";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "e8f6eab7471569cd06cd19b6927898f9"

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    huminity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value; //e.target.elements refers to input field
    const country = e.target.elements.country.value;
    const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
    const data = await apiCall.json();
    if(city && country){
      console.log("data: ", data);
      if(data.cod === 200){
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        })
      } else {
        alert("Location not found")
        return false;
      }
      
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        huminity: undefined,
        description: undefined,
        error: "Please input values"
      })
    }
  }
  render(){
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles/>
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};




        

export default App;