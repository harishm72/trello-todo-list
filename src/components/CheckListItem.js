import React, {Component} from 'react';
import RestAPI from './RestAPI';

class CheckListItem extends Component{
    constructor(props){
        super(props)
        // this.state = {
        //     state : "",
        //     textDecoration : ''
        // }
        if(this.props.item.state === 'complete') { 
            this.state = ({ state : true, style :{
                     textDecoration : 'line-through'
                     }}) 
        }
        else this.state = ({ state : false,
            style :{
                    textDecoration : 'none'
                    }})
    }
    HandleCheck1 = (event) =>{
        if(!this.state.status){
            this.setState({style : {textDecoration : "line-through"}})
            RestAPI.updateCheckListItem(this.props.idCard, this.props.item.id, this.props.item.idChecklist, 'complete' )
            .then(res => res.json())
            .then(update => this.setState({status : true}))
        }
        else {
            this.setState({style : {textDecoration : "none"}})
            RestAPI.updateCheckListItem(this.props.idCard, this.props.item.id, this.props.item.idChecklist, 'incomplete' )
            .then(res => res.json())
            .then(update => this.setState({status : false}))
        }
        console.log(this.props)
    }
    HandleCheck = () =>{
        this.setState({state : this.refs.checkbox.checked}, () =>{
            if(this.state.state){
                this.setState({style : {textDecoration : 'line-through'}})
                this.props.updateCheckListItem(this.props.idCard, this.props.item.id, this.props.item.idChecklist, 'complete')
            }
            else{
                this.props.updateCheckListItem(this.props.idCard, this.props.item.id, this.props.item.idChecklist, 'incomplete')
                 this.setState({style : {textDecoration : 'none'}})
            }
        })
       }
    deleteCheckListItem = () =>{
        console.log(this.props.item)
        this.props.deleteCheckListItem(this.props.item.idChecklist, this.props.item.id)
    }
    render(){
        const {name, id} = this.props.item
        return(
            <div className="check-list-item">
                <input id={id} type="checkbox" className="check-list-checkbox" ref="checkbox" checked={this.state.state} onChange={this.HandleCheck}></input>
                <h5 style={this.state.style} className="check-list-item-name">{name}</h5>
                <button className="delete-checklist-item" onClick={this.deleteCheckListItem}>x</button>
            </div>
        )
    }
}
export default CheckListItem;