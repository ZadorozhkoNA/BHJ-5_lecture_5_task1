let input = document.querySelector( '#chat-widget__input' );
let chatMess = document.querySelector( '#chat-widget__messages' );
let scroll = document.querySelector( '.chat-widget__messages-container' );
let deltaTime = 0;

const arrayRobotMess = [
  'Черемуха душистая',
  'С весною расцвела',
  'И ветки золотистые',
  'Что кудри, завила'
];

function getTime() {
  return `${new Date().getHours()}:${new Date().getMinutes()}`
}

function getFormData( element ) {
  let value = '';
  if ( element.value !== '') value = element.value;
  element.value = '';
  return value;
}

function getMess( element, timeMess, valueMess, clientMess = '' ) {
  let arrayMess = [];

  element.innerHTML += `
  <div class="message">
      <div class="message__time"></div>
      <div class="message__text"></div>
  </div>`;

  arrayMess = element.querySelectorAll( '.message' );

  if ( clientMess !== '' ) {
    arrayMess[arrayMess.length - 1].classList.add( clientMess );
  }
  arrayMess[arrayMess.length - 1].querySelector( '.message__time' ).textContent = timeMess;
  arrayMess[arrayMess.length - 1].querySelector( '.message__text' ).textContent = valueMess;
}

function randomInteger( min, max ) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

function gotoBottom( element ) {
   element.scrollTop = element.scrollHeight - element.clientHeight;
}

document.addEventListener( 'keydown', ( event ) => {
  if ( event.repeat ) { return };
  if ( event.keyCode === 13 && input.value !== '') {
    getMess( chatMess, getTime(), getFormData( input ), 'message_client' );
    getMess( chatMess, getTime(), arrayRobotMess[randomInteger( 0, arrayRobotMess.length -1 )] );
    gotoBottom( scroll );
    deltaTime = new Date();
  }
});

setInterval( () => {
  let difference = Math.round((new Date() - deltaTime) / 1000) * 1000;
  if ( difference === 30000 && deltaTime !== 0 ) {
    getMess( chatMess, getTime(), 'Не молчите, иначе я тоже буду молчать' );
    gotoBottom( scroll );
    deltaTime = new Date();
  }
}, 1000 );

document.querySelector( '.chat-widget' ).addEventListener( 'click', ( event ) => {
  if ( event.target !== input ) {
    event.currentTarget.classList.toggle('chat-widget_active');
  }

  if ( event.currentTarget.classList.contains('chat-widget_active') ) {
    deltaTime = new Date();
  } else {
    deltaTime = 0;
  }
});
