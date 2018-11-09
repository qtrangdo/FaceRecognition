import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import Rank from './components/Rank/Rank.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Signin from './components/Signin/Signin.js'
import Register from './components/Register/Register.js'
import './App.css';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: 'df56db0d114245be942397c62b253800'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
      imageurl:'',
      box: {},
      route: 'signin',
      isSignIn: false
    }
  }

  calculatefacelocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: (1- clarifaiFace.right_col) * width,
      bottomRow: (1 - clarifaiFace.bottom_row) * height
    }
  }

  displayFacebox = (boxin) => {
    this.setState({box: boxin})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageurl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    ).then(response => this.displayFacebox(this.calculatefacelocation(response)))
    .catch( err => console.log('error!', err))
  }

  onRouteChange = (routein) => {
    if (routein === 'signout'){
      this.setState({isSignIn: false})
    } else if (routein === 'home'){
      this.setState( {isSignIn: true})
    }
    this.setState({ route: routein});
  }

  render() {
    const {isSignIn, box, imageurl, route} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
              params={particlesOptions}
        />
        <Navigation isSignIn={isSignIn} onRouteChange = {this.onRouteChange} />
        {route === 'home' 
          ? <div> 
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange = {this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box = {box} imageurl = {imageurl}/>
            </div>
          : (
            route === 'signin' 
            ? <div>
                <Signin onRouteChange = {this.onRouteChange}/>
                <Logo />
              </div>
            : <Register onRouteChange = {this.onRouteChange} />
            )
        }      
      </div>
    );
  }
}

export default App;
