import React, {Component} from 'react';
import Card from './Card';
import RestAPI from './RestAPI';

class BoardCards extends Component{

    constructor(props){
        super(props)

        this.state ={
            cards : [],
            isCards : true,
            cardName : "",
            formVisible : {display : "none"},
            newCardvisible :{display : "block"}
        }
        this.getCards(this.props.listId)
    }
    getCards = (listId) =>{
        RestAPI.getCards(listId)
        .then(res => res.json())
        .then(data => 
            this.setState({
            cards : data,
            isCards : true
        }))
    }
    addNewCard = () =>{
        this.setState({newCardvisible : {display : "none"}, formVisible : {"display" : "flex"}})
    }
    closeAddCard = () =>{
        this.setState({newCardvisible : {display : "block"}, formVisible : {"display" : "none"}})
    }
    addCard = (event) =>{
        let newCardName = event.target.value
        this.setState({cardName : newCardName})
    }
    cardSubmit = (event) =>{
        event.preventDefault();
        if(this.state.cardName){
            this.closeAddCard();

            RestAPI.addNewCard(this.state.cardName, this.props.listId)
                .then(res => res.json())
                .then(newCard => this.setState({cards : this.state.cards.concat(newCard)}))
            this.setState({cardName : ""})

        }
    }
    deleteCard = (id) =>{
       // this.setState({cards : this.state.cards.filter(card => card.id !== id)})
        RestAPI.deleteCard(id)
        .then(res => res.json())
        .then(deletedCard => this.setState({cards : this.state.cards.filter(card => card.id !== id)}))
    }
    render(){
        if(this.state.isCards){
            let listId = this.props.listId;
            return(
                <div>
                    <div className="add-scroll">
                        {this.state.cards.map(eachcard =>
                            (<Card card={eachcard} deleteCard={this.deleteCard} checkList={this.props.checkList}/>))}
                    </div>
                    <div className="add-card">
                        <button id={listId} style={this.state.newCardvisible} onClick={this.addNewCard}className="add-new-card"> + Add a card</button>
                        <form className="card new-card-form" onSubmit={this.cardSubmit} style={this.state.formVisible}>
                            <input className="new-card-name" value={this.state.cardName} onChange={this.addCard} placeholder="Enter a title for this card..."></input>
                            <button className="new-card-add" onClick={this.cardSubmit}>Add Card</button>
                            <button className="new-card-close" onClick={this.closeAddCard}>&#128465;</button>
                        </form>
                    </div>
                </div> )}
        else return( <p>Loading......</p>)
    }
}

export default BoardCards;
