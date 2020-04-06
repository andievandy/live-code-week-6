$(document).ready(function () {
    checkLoginState()
})

$('#loginForm').submit(function (e) {
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
    }).done(function (data) {
        localStorage.setItem('access_token', data.access_token)
        checkLoginState()
    }).fail(function (error) {
        console.log(error.responseJSON)
    })
})

$('#btnLogout').click(function (e) {
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
    }).done(function (data) {
        $('#inputFoodForm')[0].reset()
        getFoodData()
    }).fail(function (error) {
        console.log(error.responseJSON)
    })
})

$('body').on('click', '.btnDeleteFood', function(e) {
    e.preventDefault();
    let id = $(this).data('id');
    $.ajax({
        url: `http://localhost:3000/foods/${id}`,
        method: 'DELETE',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    }).done(function () {
        getFoodData()
    }).fail(function (error) {
        console.log(error.responseJSON)
    })
})

function checkLoginState() {
    if (localStorage.getItem('access_token')) {
        $('#loginPage').hide()
        getFoodData()
        $('#mainPage').show()
    } else {
        $('#loginPage').show()
        $('#mainPage').hide()
    }
}

function getFoodData() {
    if (localStorage.getItem('access_token')) {
        $.ajax({
            url: 'http://localhost:3000/foods',
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        }).done(function (foods) {
            $('#listFood').empty();
            foods.forEach(food => {
                let foodItemCard = $(`
                    <div class="card">
                        <div class="card-body pb-0">
                            <div class="d-flex justify-content-between mb-0">
                                <div class="col-9">
                                    <h5 class="font-weight-bold">${food.title}</h5>
                                    <p>Rp.${food.price}</p>
                                </div>
                                <div class="col-3 d-flex align-items-baseline">
                                    <i class="fas fa-tag text-grey mr-2"></i>
                                    <p class="text-grey">${food.tag}</p>
                                    <button class="fas fa-trash text-danger ml-auto cursor-pointer btnDeleteFood" data-id="${food.id}"></button>
                                </div>
                            </div>
                            <div class="card-body border-bottom">
                                ${food.ingredients}
                            </div>
                        </div>
                    </div>
                `)
                $('#listFood').append(foodItemCard);
            });
        }).fail(function (error) {
            console.log(error.responseJSON)
        })
    }
}