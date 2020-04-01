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

  header.onmousedown = header.ontouchstart = function(e) {
    e = e || window.event;
    e.preventDefault();

    let initialCX = e.targetTouches ? e.targetTouches[0].pageX : e.clientX;
    initialCX -= windowEl.offsetLeft;
    let initialCY = e.targetTouches ? e.targetTouches[0].pageY : e.clientY;
    initialCY -= windowEl.offsetTop;

    document.onmouseup = document.ontouchend = function() {
      document.onmouseup = document.ontouchend = null;
      document.onmousemove = document.ontouchmove = null;
    };

    document.onmousemove = document.ontouchmove = function(e) {
      e = e || window.event;
      e.preventDefault();

      const type = {
        positionX: e.targetTouches ? e.targetTouches[0].pageX : e.clientX,
        positionY: e.targetTouches ? e.targetTouches[0].pageY : e.clientY
      };

      let newLO = type.positionX - initialCX;
      let newTO = type.positionY - initialCY;
      let offsetWidth = container.offsetWidth;
      let offsetHeight = container.offsetHeight;

      if (type.positionX < initialCX) {
        windowEl.style.left = "0px";
      } else if (type.positionX > offsetWidth - (width - initialCX)) {
        windowEl.style.left = offsetWidth - width + "px";
      } else {
        windowEl.style.left = newLO + "px";
      }

      if (type.positionY < initialCY) {
        windowEl.style.top = "0px";
      } else if (type.positionY > offsetHeight - (height - initialCY)) {
        windowEl.style.top = offsetHeight - height + "px";
      } else {
        windowEl.style.top = newTO + "px";
      }
    };
  };

  windowEl.appendChild(header);
  container.appendChild(windowEl);
}
