let key = "564afb2242914977a9ebb653b53a89a8";
let token = "e6a08b9a2c92190fb334fcad5adc7457f616e804279aeaec371ae6267ac138f7";
let boardID = "5c405ce05818a51c5c0836c3";

let getBoardData = () => {
    return fetch(`https://api.trello.com/1/boards/${boardID}?key=${key}&token=${token}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

let getLists = () =>{
    return fetch(`https://api.trello.com/1/boards/${boardID}/lists?key=${key}&token=${token}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }})
}

let getCards = (listId) =>{
    // requires listId to identify which list cards belongs
    return  fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }})
}
let addNewList = (listName) =>{
    return  fetch(`https://api.trello.com/1/lists?name=${listName}&idBoard=${boardID}&key=${key}&token=${token}`,
    {method : 'POST'})
}
let deleteList = (listId) =>{
    return fetch(`https://api.trello.com/1/lists/${listId}/closed/?key=${key}&token=${token}&value=true`, {
        method : 'PUT'
    })
}
let addNewCard = (cardName, listId) =>{
    return fetch(`https://api.trello.com/1/cards?idList=${listId}&name=${cardName}&key=${key}&token=${token}`, {
        method : 'POST'
    })
}

let deleteCard = (cardId) =>{
    return fetch(`https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`, {
        method : 'DELETE'
    })
}

let getCheckList = (cardId) =>{
    return fetch(`https://api.trello.com/1/cards/${cardId}?attachment_fields=all&checkItemStates=true&checklists=all&checklist_fields=all&sticker_fields=all&key=${key}&token=${token}`)
}

let AddCheckList = (cardId, checkListName) =>{
    return fetch(`https://api.trello.com/1/checklists?idCard=${cardId}&name=${checkListName}&key=${key}&token=${token}`, {
        method: 'POST'
    })
}

let deleteCheckList = (cardId) =>{
    return fetch(`https://api.trello.com/1/checklists/${cardId}?key=${key}&token=${token}`,{
        method : 'DELETE'
    })
}
let addItemToCheckList = (checkListId, checkListItemName) =>{
    return fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkListItemName}&pos=bottom&checked=false&key=${key}&token=${token}`, {
        method : 'POST'
    })
}
let deleteCheckListItem = (checkListId, checkListItemId) =>{
    return fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkListItemId}?key=${key}&token=${token}`,{
        method : 'DELETE'
    })
}

let updateCheckListItem = (cardID, checkListItemId, checkListId, state) =>{
    return fetch(`https://api.trello.com/1/cards/${cardID}/checkItem/${checkListItemId}?state=${state}&idChecklist=${checkListId}&key=${key}&token=${token}`,{
        method : 'PUT'
    })
}
export default {key, token, boardID, getBoardData, 
                getLists, addNewList, deleteList,
                getCards, addNewCard, deleteCard, 
                getCheckList, AddCheckList, deleteCheckList,
                addItemToCheckList, deleteCheckListItem, updateCheckListItem}