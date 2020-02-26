import React, {Component} from 'react';
import CheckList from './CheckList';
import '../styles/App.css';

class Modal extends Component{
    constructor(props){
        super(props)
        this.state = {
            checkListName : ""
        }
    }
    checkListName = (event) =>{
        this.setState({checkListName : event.target.value})
    }
    addCheckList = (event) =>{
        event.preventDefault();
        this.props.addCheckList(this.props.children.id, this.state.checkListName)
        this.setState({checkListName : ""})
    }
    
    render(){
        const {show, close} = this.props
        const {name, checklists} = this.props.children
        return(
            <div className="modal-wrapper"
            style={{
                transform: show ? 'translateY(0vh)' : 'translateY(-800vh)',
                opacity: show ? '1' : '0'
            }}>
            <div className="modal-header">
                <h3>{name}</h3>
                <span className="close-modal-btn" onClick={close}>×</span>
            </div>
            <div className="modal-body">
                <form onSubmit={this.addCheckList}>
                <input className="add-check-list" onChange={this.checkListName} value={this.state.checkListName} placeholder=" + Add a checklist...."></input>
                </form>
                {checklists ? checklists.map(eachCheckList => <CheckList list={eachCheckList} deleteCheckList={this.props.deleteCheckList} 
                    addItemToCheckList={this.props.addItemToCheckList}
                    deleteCheckListItem={this.props.deleteCheckListItem}
                    updateCheckListItem={this.props.updateCheckListItem}
                />) : null }
            </div>
        </div>
        )
    }
}

export default Modal; 
