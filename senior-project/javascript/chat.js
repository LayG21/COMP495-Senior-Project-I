  //close chat window on click of exit button
  //should also be used to make user disconnect from chat room

  function closeChat(){
    var chatWindow = document.getElementById('chat-window');
    chatWindow.remove();
  }

  function sendMessage(){}

  //on chat start button click, a window should be displayed and connection made with the searched for user
  function startChat(){
    $('.start-chat').on('click', function(){
      $('body').prepend("chat-window");
    })
  }

