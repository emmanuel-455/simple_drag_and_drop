const dragObject = document.querySelector("#draggable-object");
const dropContainer = document.querySelector("#drop-point");
let deviceType = "";
let initialX = 0,
  initialY = 0;
let currentElement = "";
let moveElement = false;


const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};


function dragStart(e) {
  if (isTouchDevice()) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    moveElement = true;
    currentElement = e.target;
  } else {
    e.dataTransfer.setData("text", e.target.id);
  }
}

function dragOver(e) {
  e.preventDefault();
}


const touchMove = (e) => {
  if (moveElement) {
    e.preventDefault();
    let newX = e.touches[0].clientX;
    let newY = e.touches[0].clientY;

    dragObject.style.top = dragObject.offsetTop - (initialY - newY) + "px";
    dragObject.style.left = dragObject.offsetLeft - (initialX - newX) + "px";
    initialX = newX;
    initialY = newY;
  }
};

const drop = (e) => {
  e.preventDefault();

  if (isTouchDevice()) {
    moveElement = false;

    const currentDropBound = dropContainer.getBoundingClientRect();
    if (
      initialX >= currentDropBound.left &&
      initialX <= currentDropBound.right &&
      initialY >= currentDropBound.top &&
      initialY <= currentDropBound.bottom
    ) {
      dragObject.classList.add("hide");
      dropContainer.insertAdjacentHTML(
        "afterbegin",
        '<div id="draggable-object"></div>'
      );
    }
  } else {
    if (e.target.id == "drop-point") {
      dragObject.setAttribute("draggable", "false");

      dragObject.classList.add("hide");
      e.target.insertAdjacentHTML(
        "afterbegin",
        '<div id="draggable-object"></div>'
      );
    }
  }
};

window.onload = async () => {
  currentElement = "";
  dragObject.innerHTML = "";
  dropContainer.innerHTML = "";

  if (isTouchDevice) {
    dragObject.style.position = "absolute";
  }

  dragObject.addEventListener("dragstart", dragStart);

  dragObject.addEventListener("touchstart", dragStart);
  dragObject.addEventListener("touchend", drop);
  dragObject.addEventListener("touchmove", touchMove);

  dropContainer.addEventListener("dragover", dragOver);
  dropContainer.addEventListener("drop", drop);
};