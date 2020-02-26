import React, {Component} from 'react';
import BoardCards from './BoardCards';

class BoardLists extends Component{

    deleteThisList = () =>{
        this.props.deleteList(this.props.list.id)
    }
    render(){
        let list = this.props.list
        return(
            <div className="board-cards">
                <div className="list-head">
                    <p className="card-name">{list['name']}</p>
                    <button id={list['id']} className="delete-list" onClick={this.deleteThisList}>&#128465;</button>
                </div>
                <BoardCards listId={this.props.list.id} checkList={this.props.checkList}/>
            </div>
        )
    }
}

export default BoardLists;