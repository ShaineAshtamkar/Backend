const fetchItemPrice = function () {
    let input = $("#item-input").val()

    //app.get(url, callback) = “listen for GET requests” (server).
    //$.get(url, callback) = “send a GET request” (client).

    $.get(`/priceCheck/${input}`, function (itemData) {
        $("body").append(`<div> ${itemData.price}</div>`)
        console.log(itemData)
    })
}
const buyItem = function () {

    let input = $("#itemBuy-input").val()

    $.get(`/buy/${input}`, function (itemData) {
        $("body").append(`
            <div> Congratulations, you've just bought ${itemData.name} for ${itemData.price}. 
            There are ${itemData.inventory} left now in the store.
            </div>`)

    })
}



