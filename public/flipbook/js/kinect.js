var socket;
var myImage;
var context;
var feed;
var canvasWidth;
var canvasHeight;
var lastMessageTime = 0;

document.addEventListener("DOMContentLoaded", function (event) {
  // myImage = document.getElementById('myImg');
  // console.log('about to open socket');
  socket = new WebSocket("ws://localhost:2012/kinect");
  // console.log('attempted to open socket');

  socket.onopen = function () {
    // console.log('socket opened');
  };
  socket.onclose = function () {
    // console.log('socket closed');
  };
  socket.onerror = function (err) {
    // console.log('error - ' + err);
  };
  socket.onmessage = function (event) {
    var currentTime = Date.now();

    if (currentTime - lastMessageTime >= 1000) {
      lastMessageTime = currentTime;
        console.log(event.data);
      switch (event.data) {
        case "next":
          $(".magazine").turn("next");
          e.preventDefault();
          break;
        case "previous":
          $(".magazine").turn("previous");
          e.preventDefault();
          break;
        case "start":
          $(".magazine").turn("page", 1);
          e.preventDefault();
          break;
        case "end":
          $(".magazine").turn("page", $(".magazine").turn("pages"));
          e.preventDefault();
          break;
      }
    }
  };
});
