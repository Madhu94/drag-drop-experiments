import "./styles.css";

const todos = ["Learn CSS", "Learn HTML", "Learn JS"];

function addtodos() {
  const domnode = document.createElement("div");
  domnode.classList.add("list");
  todos.forEach((todo, idx) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerText = todo;
    item.setAttribute("draggable", true);
    item.setAttribute("id", idx);
    domnode.appendChild(item);
  });
  document.getElementById("todo").appendChild(domnode);
  domnode.addEventListener("dragstart", evt => {
    evt.dataTransfer.setData("text/plain", evt.target.getAttribute("id"));
    evt.dataTransfer.dropEffect = "move";
  });
  domnode.addEventListener("dragend", evt => {
    if (evt.dataTransfer.dropEffect === "move") {
      const nodeId = evt.dataTransfer.getData("text/plain");
      domnode.removeChild(document.getElementById(nodeId));
    }
  });
  const dropzone = document.getElementById("done");
  const droplist = document.createElement("div");
  droplist.classList.add("list");
  document.getElementById("done").appendChild(droplist);

  dropzone.addEventListener("dragover", evt => {
    evt.preventDefault();
    evt.stopPropagation();
  });
  dropzone.addEventListener("drop", evt => {
    evt.preventDefault();
    const nodeId = evt.dataTransfer.getData("text/plain");
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerText = document.getElementById(nodeId).innerText;
    droplist.appendChild(item);
  });
}

addtodos();
