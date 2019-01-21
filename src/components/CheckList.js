import React, {Component} from 'react';
import CheckListItem from './CheckListItem';
class CheckList extends Component{

    constructor(props){
        super(props)
        this.state = {
            newItem : ""
        }
    }
    deleteCheckList = (event) =>{
        this.props.deleteCheckList(this.props.list.id, this.props.list.idCard)
    }
    addItem = (event) => this.setState({newItem : event.target.value})
    
    addItemToCheckList = (event) =>{
        event.preventDefault();
        this.props.addItemToCheckList(this.props.list.id, this.state.newItem, this.props.list.idCard)
        this.setState({newItem : ""})
    }
    render(){
        let list = this.props.list
        return(
            <div className="check-list">
                <div>
                    <div className="checklist-head">
                    <h3 className="checklist-name">{list.name}</h3>
                    <button className="delete-checklist" onClick={this.deleteCheckList}>&#128465;</button>
                    </div>
                    <div>
                         {this.props.list.checkItems.map(item => (<CheckListItem item={item} 
                         idCard={this.props.list.idCard} 
                         deleteCheckListItem={this.props.deleteCheckListItem}
                        updateCheckListItem={this.props.updateCheckListItem}
                        />))}
                        <form onSubmit={this.addItemToCheckList}>
                            <input className="add-checklist-item" value={this.state.newItem} onChange={this.addItem} placeholder="+ add an item to your checklist"></input>
                        </form>
                    </div>
                </div>
            </div>
        )
        }
    }

export default CheckList;