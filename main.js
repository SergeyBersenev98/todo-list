//Code starts from loading JSON from server
function get(url) {
  return new Promise(function(succeed, fail) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function() {
      if (request.status < 400)
        succeed(request.response);
      else
        fail(new Error("Request failed: " + request.statusText));
    });
    request.addEventListener("error", function() {
      fail(new Error("Network error"));
    });
    request.send();
  });
}

get("https://jsonplaceholder.typicode.com/todos").then(function(text) {
  //Then created DOM elements with gotten info.
  //Without frameworks it looks isn't pretty :(
  text = JSON.parse(text);

  for (let i = 0; i < text.length; i++){
    const divShell = document.createElement("div");
    const labelShell = document.createElement("label");
    const divInfo = document.createElement("div");
    const divInfoMain = document.createElement("div");
    const divInfoDescription = document.createElement("div");
    const input = document.createElement("input");
    const span = document.createElement("span");

    divShell.classList.add("point-of-todo");
    divInfo.classList.add("todo-info");
    divInfoMain.classList.add("todo-main-description");
    divInfoDescription.classList.add("todo-secondary-description");
    input.setAttribute("type", "checkbox");

    divInfoMain.innerHTML = text[i].title;
    let random = Math.random();
    if (random >= 0.75) {
    divInfoDescription.innerHTML = text[i].title;
    };

    divInfo.appendChild(divInfoMain);
    divInfo.appendChild(divInfoDescription);
    labelShell.appendChild(input);
    labelShell.appendChild(span);

    divShell.appendChild(labelShell);
    divShell.appendChild(divInfo);
    document.getElementById('content').appendChild(divShell);

    //if task 
    if(text[i].completed == true){
      input.setAttribute("checked", "true");
      divInfoMain.removeAttribute("class");
      divInfoMain.classList.add("corssedOutDescription");
      }

    //Event listeners
    divInfoMain.addEventListener("mouseover", function(e){
      span.style.backgroundColor = "#503d49";
    })

    divInfoMain.addEventListener("mouseout", function(e){
      span.style.backgroundColor = "#4f5565";
    })
    //Event listeners for text
    divInfoMain.addEventListener("click", function(e){
      if(input.checked){
        input.checked = false;
        divInfoMain.removeAttribute("class");
        divInfoMain.classList.add("todo-main-description");
      }else{
        input.checked = true;
        divInfoMain.removeAttribute("class");
        divInfoMain.classList.add("corssedOutDescription");
      }
    })
    //Event listeners for checkboxes
    span.addEventListener("click", function(e){
      if(input.checked){
        divInfoMain.removeAttribute("class");
        divInfoMain.classList.add("todo-main-description");
      }else{
        divInfoMain.removeAttribute("class");
        divInfoMain.classList.add("corssedOutDescription");
      };
    });
  }; 
}, function(error) {      //just some warnings
  console.log("Error!!!");
  console.log(error);
  });
  document.getElementById("warning").addEventListener("click", function(e){
  document.getElementById("warning").style.opacity = 0;
});

