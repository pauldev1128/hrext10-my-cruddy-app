/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/

//localStorage functions
/*
var createItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

var clearDatabase = function() {
  return window.localStorage.clear();
}

var showDatabaseContents = function() {
  $('tbody').html('');

  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    $('tbody').append(`<tr><td>${key}</td><td>${window.localStorage.getItem(key)}</td></tr>`)
  }
}

var keyExists = function(key) {
  return window.localStorage.getItem(key) !== null
}

var getKeyInput = function() {
  return $('.key').val();
}

var getValueInput = function() {
  return $('.value').val();
}

var resetInputs = function() {
  $('.key').val('');
  $('.value').val('');
}

$(document).ready(function() {
  showDatabaseContents();

  $('.create').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        if(confirm('key already exists in database, do you want to update instead?')) {
          updateItem(getKeyInput(), getValueInput());
          showDatabaseContents();
        }
      } else {
        createItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      }
    } else  {
      alert('key and value must not be blank');
    }
  });

  $('.update').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        updateItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key and value must not be blank');
    }
  });

  $('.delete').click(function() {
     if (getKeyInput() !== '') {
      if (keyExists(getKeyInput())) {
        deleteItem(getKeyInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key must not be blank');
    }
  });

  $('.reset').click(function() {
    resetInputs();
  })

  $('.clear').click(function() {
    if (confirm('WARNING: Are you sure you want to clear the database? \n                THIS ACTION CANNOT BE UNDONE')) {
      clearDatabase();
      showDatabaseContents();
    }
  })
})
*/

// My Script JS

const TODO = [
  {name: "Eat Breakfast", done: false},
  {name: "Workout", done: false},
  {name: "Practice Recursion", done: true},
  {name: "Do Laundry", done: false}
];


$(document).ready(function(){
  function generateItemElement(item, itemIndex, template) { 
    return `<li class="js-item-index-element" event-index="${itemIndex}">
      <span class="event-item ${item.done ? "event-item__checked" : ''}">${item.name}</span>
      <div class="event-item-controls">
        <button class="event-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
  }

  function generateToDoListStr(toDoList) {
      const items = toDoList.map((item, index) => generateItemElement(item, index));
      return items.join("");
  }

  function getList() {
    const toDoListStr = generateToDoListStr(TODO);
    $('.my-schedule').html(toDoListStr);
  }

  function addItemToList(itemName) {
    TODO.push({name: itemName, done: false});
  }

  function newEvent() {
    $('.event-list-form').submit(function(event) {
      event.preventDefault();
      const newName = $('.list-entry').val();
      $('.list-entry').val('');
      addItemToList(newName);
     getList();
    });
  }

  function getItemIndexFromElement(item) {
    const itemIndexString = $(item)
      .closest('.js-item-index-element').attr('event-index');
    return parseInt(itemIndexString, 10);
  }

  function eventToggle(itemIndex) {
    TODO[itemIndex].done = !TODO[itemIndex].done;
  }

  function itemChecked() {
    $('.my-schedule').on('click', `.js-item-toggle`, event => {
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      eventToggle(itemIndex);
      getList();
    });
  }

  function deleteListItem(itemIndex) {
    TODO.splice(itemIndex, 1); 
  }

  function itemDelete() {
    $('.my-schedule').on('click', '.item-delete', event => { 
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      deleteListItem(itemIndex);
      getList();
    });
  }

  function list() {
    getList();
    newEvent();
    itemChecked();
    itemDelete();
  }

  $(list);
})