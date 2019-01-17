import React, {Component} from 'react';

class BoardHeader extends Component{
    render(){
        const {name, id} = this.props;
        return(
            <div className="board-header">
            <div className="board-name">{name}</div>
            </div>
        )
    }
}

export default BoardHeader;