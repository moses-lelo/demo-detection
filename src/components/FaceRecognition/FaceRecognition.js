import React, { Component } from 'react';
import '../FaceRecognition/FaceRecognition.css';




class FaceRecognition extends Component {

    render() {
        return (
            <div className="center ma">
                <div className="absolute mt2">
                    <img id="inputimage" src={this.props.imageUrl} alt="" width="500" height="auto" />
                    {this.props.visages.map((faces, index) => (
                            <div key={index.toString()} className="bounding-box" style={{
                                top: (faces.faceRectangle.top / this.props.box.scale) + "px",
                                left: (faces.faceRectangle.left / this.props.box.scale) + "px", width: (faces.faceRectangle.width / this.props.box.scale) + "px",
                                height: (faces.faceRectangle.width / this.props.box.scale) + "px"
                            }}>
                            <p><strong>{this.props.names[index]}</strong></p>
                            </div>
                    ))}
                </div>
            </div>
        )
    }

}

export default FaceRecognition;