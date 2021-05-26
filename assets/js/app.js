import DragElement from "./DragElement.js";
import Timer from "./Timer.js";

let timer = document.getElementById('timer');

new DragElement({
  element: timer,
  cookieTitle: 'timer_position'
});

new Timer(timer);
