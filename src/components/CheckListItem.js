import React, { Component } from "react";

class CheckListItem extends Component {
  constructor(props) {
    super(props);
    if (this.props.item.state === "complete") {
      this.state = {
        status: true,
        style: { textDecoration: "line-through" },
      };
    } else if (this.props.item.state === "incomplete") {
      this.state = {
        status: false,
        style: { textDecoration: "none" },
      };
    }
  }

  HandleCheck = () => {
    if (this.refs.checkbox.checked) {
      this.props.updateCheckListItem(
        this.props.idCard,
        this.props.item.id,
        this.props.item.idChecklist,
        "complete"
      );
      this.setState({
        status: true,
        style: { textDecoration: "line-through" },
      });
    } else if (!this.refs.checkbox.checked) {
      this.props.updateCheckListItem(
        this.props.idCard,
        this.props.item.id,
        this.props.item.idChecklist,
        "incomplete"
      );
      this.setState({
        status: false,
        style: { textDecoration: "none" },
      });
    }
  };

  deleteCheckListItem = () => {
    this.props.deleteCheckListItem(
      this.props.item.idChecklist,
      this.props.item.id,
      this.props.idCard
    );
  };

  render() {
    const { name, id } = this.props.item;
    return (
      <div className="check-list-item">
        <input
          id={id}
          type="checkbox"
          className="check-list-checkbox"
          ref="checkbox"
          checked={this.state.status}
          onChange={this.HandleCheck}
        ></input>
        <h5 style={this.state.style} className="check-list-item-name">
          {name}
        </h5>
        <button
          className="delete-checklist-item"
          onClick={this.deleteCheckListItem}
        >
          x
        </button>
      </div>
    );
  }
}
export default CheckListItem;
