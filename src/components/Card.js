import React, {Component} from 'react';

class Card extends Component{

    constructor(props){
        super(props)
        this.state ={
            isChListVisible : {
                display : "none"
            }
        }
    }
    checkList = (event) =>{
        this.props.checkList(this.props.card.id);
    }
    deleteThisCard = () =>{
        this.props.deleteCard(this.props.card.id)
    }
    render(){
        const {id, name} = this.props.card;
        return(
            <div id={`${id}-card`} onClick={this.checkList} className="card">
                <div className="card-title">{name}</div>
                <button id={id} className="delete-card" onClick={this.deleteThisCard}>&#128465;</button>
            </div>
        )
    }
}

export default Card;