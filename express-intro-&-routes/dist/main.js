const changeColor = function (div) {
    div.style.backgroundColor = "#3498db"
}
const fetchBookData = function () {
    let input = $("#book-input").val()

    //app.get(url, callback) = “listen for GET requests” (server).
    //$.get(url, callback) = “send a GET request” (client).

    $.get(`/books/${input}`, function (bookData) {
        $("body").append(`<div>${bookData.title} - ${bookData.author}</div>`)
        console.log(bookData)
    })
} 
