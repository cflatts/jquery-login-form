/* global $ */

var loginBtn = $('#loginBtn')

function loginSuccess (response) {
  window.location = 'http://127.0.0.1:7979/index.html'
}

function loginFail (response, error, status) {
  console.log('ERROR RESPONSE:', response)
  console.log('ERROR:', error)
  console.log('ERROR STATUS:', status)
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
