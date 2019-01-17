import React, {Component} from 'react';
import BoardCards from './BoardCards';

class BoardLists extends Component{
    render(){
        let list = this.props.list
        console.log(list)
        return(
            <div className="board-cards">
                {list['name']}
                <BoardCards listId={this.props.list.id}/>
            </div>
        )
    }
}

export default BoardLists;