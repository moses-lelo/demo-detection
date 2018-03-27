import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkFom";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Modal from '../src/components/UI/Modal/Modal';
import AddingPerson from '../src/components/AddingPerson/AddingPerson';
import './App.css';

// import pour demo portfolio
import { detectFace } from '../src/components-for-demo/Detect';
import { identify } from '../src/components-for-demo/IdentityPerson';
import { identifyFace } from '../src/components-for-demo/Identify';


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialStat = {
  url: '',
  imageUrl: '',
  box: {},
  visage: [],
  personId: '',
  name: [],
  modalShow: false,


  //route state afin se verifier nos deplacement sur les differentes page 
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    username: '',
    email: '',
    joined: '',
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialStat;
  }

  calculateFaceLocation = (data) => {

    // on selectionne l'image pour obtenir sa taille initial
    const image = document.getElementById("inputimage");
    const width = Number(image.naturalWidth);
    const widthSmall = Number(image.width);

    // on calcule le coefficient d'ajustement de la taille 
    const scale = width / widthSmall;

    /*
    pour afficher le portrait ciblant le visage ;on utilise 
    un objet qui affichera les differents points reliés entre-elles 
    à l'aide de CSS puis a l'aide du variable scale on remet le protrait 
    à l'échelle
    */

    return {
      scale: scale,
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {

    this.setState({ url: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.url });

    /* renvoit au serveur la tâche de gerer de face api, afin d'analyser l'image; non utilisé dans la demo
    fetch('http://localhost:8081/api', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: this.state.url
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ visage: response });


        this.displayFaceBox(this.calculateFaceLocation(response));

      })
      .catch(err => console.log(err));

      */
    // ci dessous methodes utilisées pour la demo
    if (this.state.url !== "") {

      let url = this.state.url;

      const params = {
        url,
      }
      detectFace(params)
        .then(response => response.json())
        .then(response => {

      

          this.setState({
            visage: response,
            name: [],
          }, () => {

            this.state.visage.map((faces, index) => (
              this.onIdentifyFaceId(index)
            ));

          });

          this.displayFaceBox(this.calculateFaceLocation(response));

        })
        .catch(err => console.log(err));

    }

  }


  onIdentifyFaceId = (index) => {

    let faceIds = this.state.visage[index].faceId;
    let personGroupId = "demo";

    const params = {
      faceIds,
      personGroupId,
    };

    identifyFace(params)
      .then(response => response.json())
      .then(body => {
        

        if (body[0].candidates[0] !== undefined) {

          this.setState({
            personId: body[0].candidates[0].personId
          }, () => {
            this.onPersonNameIdentify()
          })

        }
        else{
          
          this.setState(previousState => ({
           name: [...previousState.name, 'inconnu(e)'],
         }), () => {
           
         })
        }
        



      })
      .catch(console.error());

  }

  onPersonNameIdentify = () => {

    let personGroupId = "demo";
    let personId = this.state.personId;

    const params = {
      personGroupId,
      personId,
    }

    identify(params)
      .then(response => response.json())
      .then(data => {

        this.setState(previousState => ({
          name: [...previousState.name, data.name],
        }), () => {
         
        })

      })
      .catch(console.error())

  }

  onModalCloseHandler = () => {
    this.setState({
      modalShow: false,
    })
  }

  onModalShowHandler = () => {
    this.setState({
      modalShow: true,
    })
  }


  /*******Route*******/


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }


  /*shouldComponentUpdate(nextState) {
    if(this.state.visageIds !== nextState.visageIds){
      return true;
    }
    return false;
  }*/



  render() {


    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Modal show={this.state.modalShow} modalClosed={this.onModalCloseHandler} >
              <AddingPerson modalClosed={this.onModalCloseHandler} />
            </Modal>
            <Rank showModal={this.onModalShowHandler} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} visages={this.state.visage} names={this.state.name} />)
          </div>

          : (
            this.state.route === 'signin'
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />

          )


        }
      </div>
    );
  }
}

export default App;
