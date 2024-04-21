const boxes = document.querySelectorAll(".box");
const centerDiv = document.querySelector(".center-div");
const container = document.querySelector(".container");

let isDragging = false;

centerDiv.addEventListener("mousedown", startDrag);

function startDrag(e) {
  isDragging = true;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
}

function drag(e) {
  if (isDragging) {
    const containerRect = container.getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left - centerDiv.offsetWidth / 2;
    const offsetY = e.clientY - containerRect.top - centerDiv.offsetHeight / 2;

    centerDiv.style.left = offsetX + "px";
    centerDiv.style.top = offsetY + "px";

    // checkHoveredBox(e.clientX, e.clientY);
  }
}

function stopDrag(e) {
  if (isDragging) {
    isDragging = false;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
    // snapToCorner(currentBox);
    testAndTry(e);
    currentBox = null;
  }
}

function testAndTry(e) {
  var target = e.target.innerText;
  var boxx = document.getElementById("boxx");
  if (target === "Box-A") {
    boxx.style.top = "29px";
    boxx.style.left = "29px";
    // boxx.style.direction = "rtl"; // Right-to-left direction
  } else if (target === "Box-B") {
    boxx.style.top = "29px";
    boxx.style.left = "1490px";
    // boxx.style.direction = "ltr"; // Left-to-right direction
  } else if (target === "Box-C") {
    boxx.style.top = "705px";
    boxx.style.left = "29px";
    // boxx.style.direction = "rtl"; // Right-to-left direction
  } else if (target === "Box-D") {
    boxx.style.top = "705px";
    boxx.style.left = "1490px";
    // boxx.style.direction = "ltr"; // Left-to-right direction
  }
}

boxes.forEach((box) => {
  box.addEventListener("mouseenter", function (e) {
    if (isDragging) {
      currentBox = box;
    }
  });

  box.addEventListener("mouseleave", function (e) {
    if (isDragging) {
      snapToCorner(currentBox);
    }
  });
});

// Function to handle snapping to the top-left corner of the first number div
function snapToFirstNumberDiv() {
  const firstNumberDiv = boxes[0];
  const rect = firstNumberDiv.getBoundingClientRect();
  centerDiv.style.left = rect.left + "px";
  centerDiv.style.top = rect.top + "px";
}

centerDiv.addEventListener("mousedown", function (e) {
  startDrag(e);
});
//Vertical
const separatorVertical = document.getElementById("separator1");
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
let isDragVertical = false;
let initialWidth;
let initialMouseX;

separatorVertical.addEventListener("mousedown", startDragVertical);

function startDragVertical(e) {
  isDragVertical = true;
  initialWidth = box1.getBoundingClientRect().width;
  initialMouseX = e.clientX;
  document.addEventListener("mousemove", dragVertical);
  document.addEventListener("mouseup", stopDragVertical);
}

function dragVertical(e) {
  if (isDragVertical) {
    const deltaX = e.clientX - initialMouseX;
    const newWidth1 = initialWidth + deltaX;
    const newWidth2 = box1.parentNode.getBoundingClientRect().width - newWidth1;

    // Update widths
    box1.style.width = newWidth1 + "px";
    box2.style.width = newWidth2 + "px";
  }
}

function stopDragVertical() {
  isDragVertical = false;
  document.removeEventListener("mousemove", dragVertical);
}

//Horizontal
const separatorHorizontal = document.getElementById("separator2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
let isDragHorizontal = false;
let initialHeight;
let initialMouseY;

separatorHorizontal.addEventListener("mousedown", startDragHorizontal);

function startDragHorizontal(e) {
  isDragHorizontal = true;
  initialHeight = parseFloat(getComputedStyle(box3).height);
  initialMouseY = e.clientY;
  document.addEventListener("mousemove", dragHorizontal);
  document.addEventListener("mouseup", stopDragHorizontal);
}

function dragHorizontal(e) {
  if (isDragHorizontal) {
    const deltaY = e.clientY - initialMouseY;
    const newHeight1 = initialHeight + deltaY;
    const containerHeight = box3.parentNode.getBoundingClientRect().height;
    const clampedHeight1 = Math.min(Math.max(newHeight1, 0), containerHeight);

    box3.style.height = clampedHeight1 + "px";
    box4.style.height = containerHeight - clampedHeight1 + "px";
  }
}

function stopDragHorizontal() {
  isDragHorizontal = false;
  document.removeEventListener("mousemove", dragHorizontal);
  document.removeEventListener("mouseup", stopDragHorizontal);
}
