import React from 'react';

const Rank = (props) => {
    return (
        <div>
            <div className="white f3">
                {"Ajouter une personne à identifier."}
            </div>
            <button
                className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                onClick={props.showModal}
            >Ajoutez</button>
        </div>
    );
}

export default Rank;