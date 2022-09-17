import React, { Component } from "react";
import BoardHeader from "./BoardHeader";
import BoardContent from "./BoardContent";

class Board extends Component {
  render() {
    const { name, id, lists } = this.props;
    return (
      <div className="board">
        <BoardHeader name={name} id={id} />
        <BoardContent
          name={name}
          id={id}
          lists={lists}
          addNewList={this.props.addNewList}
          deleteList={this.props.deleteList}
          checkList={this.props.checkList}
        />
      </div>
    );
  }
}
export default Board;
