import React, { Component } from 'react';
import RestAPI from './components/RestAPI'
import Header from './components/Header';
import Board from './components/Board';
import Modal from './components/Modal';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardId : RestAPI.boardID,
      boardData: {},
      isData : false,
      lists : [],
      modalShow : false,
      modalChildren : [],
      cardTitle : ""
    }
    this.getData();
    this.getLists();
  }
  
  getData = () => {
    RestAPI.getBoardData()
      .then(res => res.json())
      .then(feedData => this.setState({
        boardData: feedData,
        isData : true
      }))
      .catch(err => console.log(err))
  }
  getLists = () =>{
    RestAPI.getLists()
    .then(res => res.json())
    .then(allLists => this.setState({ lists : allLists}))
    .catch(err => console.log(err))
  }
  addNewList = (listName) =>{
    RestAPI.addNewList(listName)
    .then(res => res.json())
    .then(newList => this.setState({lists : this.state.lists.concat(newList)}))
    .catch(err => console.log(err))
  }
  deleteList = (id) =>{
    RestAPI.deleteList(id)
    .then(res => res.json())
    .then(deletedList => this.setState({lists : this.state.lists.filter(list => list.id !== id)}))
    .catch(err => console.log(err))
  }
  checkList = (cardID) =>{
    RestAPI.getCheckList(cardID)
    .then(res => res.json())
    .then(checkLists => this.setState({modalChildren : checkLists, modalShow : true}))
  }
  addCheckList = (cardID, checkListName) =>{
    RestAPI.AddCheckList(cardID, checkListName)
    .then(res => res.json())
    .then(data => (this.checkList(cardID)))
  }
  deleteCheckList = (checkListId, cardID) =>{
    RestAPI.deleteCheckList(checkListId)
    .then(res => res.json())
    .then(data => this.checkList(cardID))
  }
  addItemToCheckList = (checkListId, checkListItemName, cardID) =>{
    RestAPI.addItemToCheckList(checkListId, checkListItemName)
    .then(res  => res.json())
    .then(data => this.checkList(cardID))
  }
  deleteCheckListItem = (checkListId, checkListItemId, cardID) =>{
    RestAPI.deleteCheckListItem(checkListId, checkListItemId)
    .then(res => res.json())
    .then(data =>  this.checkList(cardID))
  }
  updateCheckListItem = (cardID, checkListItemId, checkListId, state) =>{
    RestAPI.updateCheckListItem(cardID, checkListItemId, checkListId, state)
    .then(res => res.json())
    .then(update => (this.checkList(cardID)))
  }
  close = () =>{
    this.setState({modalShow : false})
  }
  render() {
    if (!this.state.isData) {
      return(
        <div>Loading...</div>
      )
    }
    const {name,prefs} = this.state.boardData;
    let bgimage = {
      backgroundImage: `url('${prefs.backgroundImage}')`,
    };
    return (
      <div style={bgimage} className="App">
        <Header />  
        <Board name={name} 
        boardID={this.state.boardId} 
        lists={this.state.lists} 
        addNewList={this.addNewList} 
        deleteList={this.deleteList}
        checkList={this.checkList}
        />
        <Modal show={this.state.modalShow} 
        children={this.state.modalChildren} 
        cardTitle={this.state.cardTitle}
        close={this.close}
        addCheckList={this.addCheckList}
        deleteCheckList={this.deleteCheckList}
        addItemToCheckList={this.addItemToCheckList}
        deleteCheckListItem={this.deleteCheckListItem}
        updateCheckListItem={this.updateCheckListItem}
        />
      </div>
    );
  }
}

export default App;
