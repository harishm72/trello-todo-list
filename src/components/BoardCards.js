import React, {Component} from 'react';
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
    render(){
        if(this.state.isCards){
            let listId = this.props.listId;
            return(
                <div>
                    {this.state.cards.map(eachcard =><div id={eachcard['id']} className="card">{eachcard.name}</div>)}
                    <div className="add-card">
                        <button id={listId} style={this.state.newCardvisible} onClick={this.addNewCard}className="add-new-card"> + Add a card</button>
                        <form className="card new-card-form" onSubmit={this.cardSubmit} style={this.state.formVisible}>
                            <input className="new-card-name" value={this.state.cardName} onChange={this.addCard} placeholder="Enter a title for this card..."></input>
                            <button className="new-card-add" onClick={this.cardSubmit}>Add Card</button>
                            <button className="new-card-close" onClick={this.closeAddCard}>X</button>
                        </form>
                        {/* <button className="add-new-list" style={this.state.newListvisible} onClick={this.addNewList}>+ Add another List</button>
                    <form className="new-list-form" style={this.state.formVisible} onSubmit={this.listSubmit}>
                        <input className="new-list-name" value={this.state.listName} onChange={this.addList} placeholder="Enter a list title ..."></input>
                        <button className="new-list-add" onClick={this.listSubmit}>Add List</button>
                        <button className="new-list-close" onClick={this.closeAddList}>X</button>
                    </ form> */}
                    </div>
                </div> )}
        else return( <p>Loading......</p>)
    }
}

export default BoardCards;
