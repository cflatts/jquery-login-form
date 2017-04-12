/* global $ */

var loginBtn = $('#loginBtn')

function loginSuccess (response) {
  window.location = 'http://127.0.0.1:7979/index.html'
}

function createErrorEl (newEl, errorText, appendEl) {
  $(newEl, {
    html: errorText,
    'class': 'error'
  }).appendTo(appendEl)
}

function loginFail (response, error, status) {
  console.log(response)
  if (response.readyState === 0) {
    createErrorEl('<p/>', 'The server has timed out', '.action-row')
  } else if (response.readyState === 4) {
    if (response.status === 400) {
      if (response.responseText === '{"error":"Invalid username."}') {
        createErrorEl('<p/>', 'The username is incorrect', '.username')
      } else if (response.responseText === '{"error":"Invalid password."}') {
        createErrorEl('<p/>', 'The password is incorrect', '.password')
      }
    } else if (response.status === 500) {
      createErrorEl('<p/>', 'The server has responded with an error', '.action-row')
    }
  }
}

function login (evt) {
  evt.preventDefault()
  var username = $('#loginInput')
  var password = $('#passwordInput')

  $.ajax({
    method: 'POST',
    data: {
      username: username.val(),
      password: password.val()
    },
    url: 'http://127.0.0.1:7979/api/login',
    success: loginSuccess,
    error: loginFail,
    timeout: 15000
  })
}
loginBtn.click(login)
