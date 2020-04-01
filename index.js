const ID = GenID();

function* GenID() {
  let x = 0;

  while (true) {
    yield x;
    x++;
  }
}

const container = document.getElementById("container");

function handleClick() {
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;

  const windowEl = document.createElement("div");
  const header = document.createElement("div");

  const id = ID.next().value;

  windowEl.setAttribute("class", "window");
  windowEl.setAttribute("id", `draggable-${id}`);
  windowEl.style.width = width + "px";
  windowEl.style.height = height + "px";
  header.setAttribute("class", "top-bar");
  header.setAttribute("id", `draggable-${id}-header`);

  header.onmousedown = function(e) {
    e = e || window.event;
    e.preventDefault();

    let initialCX = e.clientX - windowEl.offsetLeft;
    let initialCY = e.clientY - windowEl.offsetTop;

    document.onmouseup = function() {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    document.onmousemove = function(e) {
      e = e || window.event;
      e.preventDefault();

      let newLO = e.clientX - initialCX;
      let newTO = e.clientY - initialCY;
      let offsetWidth = container.offsetWidth;
      let offsetHeight = container.offsetHeight;

      if (e.clientX < initialCX) {
        windowEl.style.left = "0px";
      } else if (e.clientX > offsetWidth - (width - initialCX)) {
        windowEl.style.left = offsetWidth - width + "px";
      } else {
        windowEl.style.left = newLO + "px";
      }

      if (e.clientY < initialCY) {
        windowEl.style.top = "0px";
      } else if (e.clientY > offsetHeight - (height - initialCY)) {
        windowEl.style.top = offsetHeight - height + "px";
      } else {
        windowEl.style.top = newTO + "px";
      }
    };
  };

  header.ontouchstart = function(e) {
    e = e || window.event;
    e.preventDefault();

    let initialCX = e.targetTouches[0].pageX - windowEl.offsetLeft;
    let initialCY = e.targetTouches[0].pageY - windowEl.offsetTop;

    document.ontouchend = function() {
      document.ontouchend = null;
      document.ontouchmove = null;
    };

    document.ontouchmove = function(e) {
      e = e || window.event;
      e.preventDefault();

      let touchLocation = e.targetTouches[0];

      let newLO = touchLocation.pageX - initialCX;
      let newTO = touchLocation.pageY - initialCY;
      let offsetWidth = container.offsetWidth;
      let offsetHeight = container.offsetHeight;

      if (touchLocation.pageX < initialCX) {
        windowEl.style.left = "0px";
      } else if (touchLocation.pageX > offsetWidth - (width - initialCX)) {
        windowEl.style.left = offsetWidth - width + "px";
      } else {
        windowEl.style.left = newLO + "px";
      }

      if (touchLocation.pageY < initialCY) {
        windowEl.style.top = "0px";
      } else if (touchLocation.pageY > offsetHeight - (height - initialCY)) {
        windowEl.style.top = offsetHeight - height + "px";
      } else {
        windowEl.style.top = newTO + "px";
      }
    };
  };

  windowEl.appendChild(header);
  container.appendChild(windowEl);
}
