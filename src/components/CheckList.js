import React, {Component} from 'react';
import CheckListItem from './CheckListItem';
import RestAPI from './RestAPI';
class CheckList extends Component{

    constructor(props){
        super(props)
        this.state = {
            checkItems : this.props.list.checkItems,
            newItem : ""
        }
    }
    deleteCheckList = (event) =>{
        this.props.deleteCheckList(this.props.list.id, this.props.list.idCard)
    }
    addItem = (event) => this.setState({newItem : event.target.value})
    
    addItemToCheckList = (event) =>{
        event.preventDefault();
        RestAPI.addItemToCheckList(this.props.list.id, this.state.newItem)
            .then(res => res.json())
            .then(newItem => this.setState({checkItems : this.props.list.checkItems.push(newItem)}))
        this.setState({newItem : ""})
    }
    deleteCheckListItem = (checkListId, checkListItemId) =>{
        RestAPI.deleteCheckListItem(checkListId, checkListItemId)
        .then(res => res.json())
        .then(newItem => this.setState({checkItems : this.props.list.checkItems = this.props.list.checkItems.filter(item =>(item['id'] !== checkListItemId))}))
    }
    updateCheckListItem = (idCard, id, idChecklist, status) =>{
        RestAPI.updateCheckListItem(idCard, id, idChecklist, status)
        .then(res => res.json())
        .then(update => this.setState({checkItems : this.state.checkItems.map(item  => {
            if(item['id'] === update['id']){
                item['state'] = update['state']
            }
            return item
        })}) )
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
                         {this.state.checkItems.map(item => (<CheckListItem item={item} 
                         idCard={this.props.list.idCard} 
                         deleteCheckListItem={this.deleteCheckListItem}
                        updateCheckListItem={this.updateCheckListItem}
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