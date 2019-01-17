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

let addNewCard = (cardName, listId) =>{
    return fetch(`https://api.trello.com/1/cards?idList=${listId}&keepFromSource=all&key=${key}&token=${token}`, {
        method : 'POST',
        body : JSON.stringify({
            name : cardName
        })
    })
}
export default {key, token, boardID, getBoardData, getLists, getCards, addNewList, addNewCard}