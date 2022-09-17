import React, { Component } from "react";
import BoardList from "./BoardLists";

class BoardContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listName: "",
      formVisible: { display: "none" },
      newListvisible: { display: "block" },
    };
  }
  addNewList = () => {
    this.setState({ formVisible: { display: "flex" } });
    this.setState({ newListvisible: { display: "none" } });
  };
  closeAddList = () => {
    this.setState({ formVisible: { display: "none" } });
    this.setState({ newListvisible: { display: "block" } });
  };
  addList = (event) => {
    let newListName = event.target.value;
    this.setState({ listName: newListName });
  };
  listSubmit = (event) => {
    event.preventDefault();
    if (this.state.listName) {
      this.setState({ listName: "" });
      this.closeAddList();
      this.props.addNewList(this.state.listName);
    }
  };
  render() {
    let lists = this.props.lists;
    return (
      <div className="boardContent">
        {lists.map((eachlist) => (
          <BoardList
            list={eachlist}
            deleteList={this.props.deleteList}
            checkList={this.props.checkList}
          />
        ))}

        <div className="board-cards new-list">
          <button
            className="add-new-list"
            style={this.state.newListvisible}
            onClick={this.addNewList}
          >
            + Add another List
          </button>
          <form
            className="new-list-form"
            style={this.state.formVisible}
            onSubmit={this.listSubmit}
          >
            <input
              className="new-list-name"
              value={this.state.listName}
              autoFocus
              onChange={this.addList}
              placeholder="Enter a list title ..."
            ></input>
            <button className="new-list-add" onClick={this.listSubmit}>
              Add List
            </button>
            <button className="new-list-close" onClick={this.closeAddList}>
              X
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default BoardContent;
