$(document).ready(function() {
    checkLoginState()
})

$('#loginForm').submit(function(e) {
    e.preventDefault()
    let email = $('#loginEmail').val()
    let password = $('#loginPassword').val()

    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
            email,
            password
        }
    }).done(function(data) {
        localStorage.setItem('access_token', data.access_token)
        checkLoginState()
    }).fail(function(error) {
        console.log(error.responseJSON)
    })
})

$('#btnLogout').click(function(e) {
    e.preventDefault()
    localStorage.removeItem('access_token')
    checkLoginState()
})

$('#inputFoodForm').submit(function (e) {
    e.preventDefault()
    let title = $('#inputFoodName').val()
    let price = $('#inputFoodPrice').val()
    let ingredients = $('#inputFoodIngredients').val()
    let tag = $('#inputFoodTag').val()
    $.ajax({
        url: 'http://localhost:3000/foods',
        method: 'POST',
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            price,
            ingredients,
            tag
        }
    }).done(function(data) {
        console.log(data)
    }).fail(function(error) {
        console.log(error.responseJSON)
    })
})

function checkLoginState() {
    if(localStorage.getItem('access_token')) {
        $('#loginPage').hide()
        $('#mainPage').show()
    } else {
        $('#loginPage').show()
        $('#mainPage').hide()
    }
}