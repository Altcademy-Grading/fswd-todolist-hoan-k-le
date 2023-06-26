import $ from 'jquery'
import './requests.js'
import { indexTasks, postTask, deleteTask, updateTask } from './requests.js'

function refreshTasksList() {
  indexTasks(function (response) {
    var htmlString = response.tasks.map(function (task) {
      return `
      <div class='col-12 mb-3 p-2 border rounded task' data-id='${task.id}'>
        ${task.content}
        <button class='delete-button' data-id='${task.id}'>Delete</button>
        <button id='updateButton' class='edit-button' data-id='${task.id}'>Edit</button>
        <input type='text' class='edit-input' id='taskContent' />
      </div>
    `
    })
    $('#tasks').html(htmlString)

    $('.delete-button').click(function () {
      // points to the id of the data correlating to its content
      var taskId = $(this).data('id')
      handleDelete(taskId)
    })
  })
}

$(document).ready(function () {
  refreshTasksList()
})

$(document).on('click', '#updateButton', function () {
  var taskId = $(this).data('id')
  // editEl.style.display = 'block'
  var taskContent = $('#taskContent').val() // Get the updated task content from the input field
  var editEl = document.querySelector('.edit-input')
  // Call the updateTask function
  updateTask(taskId, taskContent, refreshTasksList)
})

function handleDelete(taskId) {
  deleteTask(
    taskId,
    function () {
      // Success callback
      console.log('Task deleted successfully!')
      refreshTasksList()
    },
    function () {
      // Error callback
      console.log('Error deleting the task.')
    }
  )
}

$(document).on('click', '#submit', function (e) {
  var inputValue = document.getElementById('createTasks').value
  postTask(
    inputValue,
    function () {
      // Success callback
      console.log('Task created successfully!')
      refreshTasksList()
    },
    function () {
      // Error callback
      console.log('Error creating the task.')
    }
  )
  inputValue = ''
})
