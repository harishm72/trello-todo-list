import React from "react";
import BoardCards from "./BoardCards";

const BoardLists = (props) => {
  const deleteThisList = () => {
    props.deleteList(props.list.id);
  };
  const { list, checkList } = props;
  return (
    <div className="board-cards">
      <div className="list-head">
        <p className="card-name">{list["name"]}</p>
        <button
          id={list["id"]}
          className="delete-list"
          onClick={deleteThisList}
        >
          &#128465;
        </button>
      </div>
      <BoardCards listId={list.id} checkList={checkList} />
    </div>
  );
};

export default BoardLists;
