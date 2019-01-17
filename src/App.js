import React, { Component } from 'react';
import RestAPI from './components/RestAPI'
import Header from './components/Header';
import Board from './components/Board';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardId : RestAPI.boardID,
      boardData: {},
      isData : false,
      lists : []
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
    console.log(this.state.lists)
    return (
      <div style={bgimage} className="App">
        <Header />  
        <Board name={name} boardID={this.state.boardId} lists={this.state.lists} addNewList={this.addNewList}/>
      </div>
    );
  }
}

export default App;
