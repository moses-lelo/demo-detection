import React, { Component } from 'react';
import { createPerson } from '../../components-for-demo/Person';
import { addPersonFace } from '../../components-for-demo/Person';
import { trainPersonGroupId } from '../../components-for-demo/Train';
import './AddingPerson.css'

class AddingPerson extends Component {
    state = {
        url: '',
        personGroupId: 'demo',
        personName: '',
        personId: '',
        lastPersonId: '',
        personAdded:false,
        pictureAdded:false,
        canAdd:false,
    }

    onUrlHandler =( event) => {
        this.setState({
            url: event.target.value
        })
    }

    onPersonNameHandler = (event) => {
        this.setState({
            personName: event.target.value
        })
    }

    onCreatePersonForGroupHandler = () => {

        let name = this.state.personName;
        let personGroupId = this.state.personGroupId;

        const params = {
            personGroupId,
            name,
        };

        if(this.state.personName !== ""){

            createPerson(params)
            .then((response) => response.json())
            .then((body) => {
                //console.log(body.personId)
                this.setState({
                    lastPersonId: body.personId,
                }, ()=> {
                    this.setState({
                        personAdded:true,
                    })
                })
            })
            .catch(console.error);
        }

        else{
            alert("Veuillez entrer un nom.")
        }
        
    }

    onAddPictureToPersonFaceHandler = () => {
        let url = this.state.url;
        let personId = this.state.lastPersonId;
        let personGroupId = this.state.personGroupId;

        const params = {
            url,
            personId,
            personGroupId,
        };

        if(this.state.url !== "" && this.state.personName !==""){
            addPersonFace(params)
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    pictureAdded:true,
                });
            })
            .catch(console.error);
        }
        else {
            alert("Veuillez ajouter une photo et n'oubliez pas d'indiquer le nom")
        }


        
    }

    onTrainHandler = () => {

        let personGroupId = this.state.personGroupId;

        const params = {
            personGroupId
        };


        if(this.state.url !== "" && this.state.personName !==""){
             trainPersonGroupId(params)
            .catch(console.error);

            this.setState({
                url:'',
                personName:'',
                pictureAdded:false,
                personAdded: false,
            })

            // ferme le modal à l'enregistrement
            this.props.modalClosed()
        }

        else {
            alert("Veuillez compléter les champs indiqués")
        }

    }




    render() {
        return (
            <div>
                <div>
                    <h1>1. Ajouter une personne</h1>
                    <label htmlFor="">
                        Nom: 
                        <input type="text"
                        value={this.state.personName}
                        onChange={this.onPersonNameHandler}
                        placeholder="ex: Leonardo DiCaprio"/>
                    </label>
                    <button onClick={this.onCreatePersonForGroupHandler} className="btn form__submit-btn" >Ajoutez personne</button>
                    { this.state.personAdded? <div className="circle done"><p>Ajouté</p></div> : null}

                </div>

                <div>
                    <h1>2. Ajouter la photo de la personne</h1>
                    <label htmlFor="">
                        Url:
                        <input type="text"
                        value={this.state.url}
                        onChange={this.onUrlHandler}
                        placeholder="ex: http://une-photo.com"/>
                    </label>
                    <button 
                    onClick={this.onAddPictureToPersonFaceHandler} className="btn form__submit-btn">Ajoutez la Photo</button>
                    {this.state.pictureAdded ? <div className="circle done"><p>Ajouté</p></div>  : null}
                </div>
                <br/>
                <button onClick={this.onTrainHandler} className="btn form__submit-btn" >Enregistrez</button>
            </div>
        )
    }


}

export default AddingPerson;