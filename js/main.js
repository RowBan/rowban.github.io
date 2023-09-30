/**
 * Todo-list
 * written by Robert Eriksson
 */

'use strict';

function initTodoList() {
    const userInput = document.getElementById('newtodo');
    const addButton = document.getElementById('newtodobutton');
    const deleteButton = document.getElementById('clearbutton');
    const list = document.getElementById('todolist');
    let storedArray = JSON.parse(localStorage.getItem('todolist')) || [];
    

    // Function to add a single item to the list
    function addTodoItem(item) {
        const li = document.createElement('article');
        li.textContent = item;
        list.appendChild(li);
    }

    // Function to validate and add a new to-do item
    function handleAddTodo() {
        const newItem = userInput.value.trim();
        
        if (newItem.length < 5) {
            alert('Your todo item must be at least 5 characters long!');
        } else if (storedArray.includes(newItem)) {
            alert('You\'ve already added that item to the list!');
        } else {
            storedArray.push(newItem);
            addTodoItem(newItem);
            localStorage.setItem('todolist', JSON.stringify(storedArray));
        }

        userInput.value = ''; // Clear the input field
    }

        // Function to delete a single item from the list
        function handleDeleteTodoItem(event) {
            const clickedItem = event.target;
    
            // Remove <li> from list
            clickedItem.remove();
    
            if (storedArray.includes(clickedItem.textContent)) {
                // Remove from storedArray
                storedArray.splice(storedArray.indexOf(clickedItem.textContent), 1);
    
                // Overwrite storedArray into local storage
                localStorage.setItem('todolist', JSON.stringify(storedArray));
            }
        }

    // Function to clear the list and local storage
    function handleDeleteTodoList() {
        localStorage.clear();
        storedArray = [];
        list.innerHTML = '';
    }

    // Initialize the list with stored items
    console.log(typeof storedArray + " <-- storedArray items");
    storedArray.forEach(addTodoItem);

    // Attach event listeners
    addButton.addEventListener('click', handleAddTodo);
    deleteButton.addEventListener('click', handleDeleteTodoList);
    list.addEventListener('click', function(event) {
        if (event.target.tagName === 'ARTICLE') {
            handleDeleteTodoItem(event);
            console.log(event.target);
        }
    });
}

initTodoList();