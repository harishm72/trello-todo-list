import React, {Component} from 'react';

class BoardHeader extends Component{
    render(){
        const {name} = this.props;
        return(
            <div className="board-header">
            <div className="board-name">{name} Clone</div>
            </div>
        )
    }
}

export default BoardHeader;