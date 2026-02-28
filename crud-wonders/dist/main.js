const source = $("#wonders-template").html()
const template = Handlebars.compile(source)

const render = function (wonders) {
    $("#wonders").empty()
    let newHtml = template({ wonders })
    $("#wonders").append(newHtml)
}

const fetch = function () {
    $.get("/wonders", function (response) {
        render(response)
    })

}

const addWonder = function () {
    let newWonder = $("#new-wonder-input").val()
    let newLocation = $("#new-location-input").val()
    //POST the newWonder to the server
    let data = { name: newWonder, location: newLocation }
    $.post('/wonder', data, function (response) {
        console.log("POST complete")
        fetch()
    })

}

const updateVisited = function (wonder) {
    $.ajax({
        url: `/wonder/${wonder}`,
        method: "PUT",
        success: function (response) {
            console.log("PUT complete")
            fetch()
        }
    })
}


$.ajax({
    url: `/wonder/Colosseum`,
    method: "DELETE",
    success: function (response) {
        console.log("DELETE complete")
        fetch()
    }
})



//$(parentSelector).on(eventType, childSelector, callbackFunction)
$("#wonders").on("click", ".visit", function () {
    let wonder = $(this).closest(".wonder").find(".name").text()
    //this-the button with class .visit).
    //.closest(".wonder") From the clicked button, it moves up the DOM to
    //  the nearest parent element that has class .wonder (the whole “wonder card”).

    //PUT this to the server: update the wonder's `visited` status to `true`
    updateVisited(wonder.split("-")[0].trim())
})




fetch() //load the data on page load