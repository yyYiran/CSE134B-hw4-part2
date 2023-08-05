let output = document.querySelector("output");


class ProjectCard extends HTMLElement {
  constructor() {
      super();

      // Create a shadow root
      const shadow = this.attachShadow({ mode: 'open' });

      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h2 = card.appendChild(document.createElement("h2"));
      h2.textContent = this.getAttribute("title");

      const img = card.appendChild(document.createElement("img"));
      img.src = this.hasAttribute("img")
          ? this.getAttribute("img")
          : "./img/default.jpg";
      img.alt = this.hasAttribute("alt") ? this.getAttribute("alt") : "project-image";

      const p = card.appendChild(document.createElement("p"));
      p.textContent = this.getAttribute("description");

      const a = card.appendChild(document.createElement("a"));
      const link = this.hasAttribute("link")
      ? this.getAttribute("link")
      : "#";
      a.setAttribute("href", link);
      a.setAttribute("target", "_");
      a.textContent = "Read More";

      const style = document.createElement("style");
      style.textContent = `.card {
        display:flex;
        flex-direction: column;
        border: 1px black solid; 
      }
      .card img {
        width: 300px;
        height: 300px;
      }
      .card h2{
        text-align: center;
      }
      `;
      

      this.shadowRoot.append(style, card);
  }
}

// Define the custom element "custom-button"
customElements.define('project-card', ProjectCard);


const localData = [
  {"title": "Project 1 - local",
  "img": "https://source.unsplash.com/random/?flower",
  "alt": "p1",
  "description": "project 1 is a LOCAL random project with flower flower", 
 "link": "https://ucsd.edu/"},
  

  {"title": "Project 2 - local",
  "img": "https://source.unsplash.com/random/?dog",
  "alt": "p2",
  "description": "priject 2 is a another random dog dog, local local!!!", 
"link": "https://www.ucla.edu/"},

  {"title": "Project 3 - local",
  "alt": "p3",
  "img": "https://source.unsplash.com/random/?cake",
  "description": "project 3 uses another cake", 
  "link": "https://www.ucdavis.edu/"}
]
localStorage.setItem('data', JSON.stringify(localData));


let localBtn = document.getElementById("localBtn");
localBtn.addEventListener("click", function(){
  output.innerHTML = "";
  const data = JSON.parse(localStorage.getItem('data'));
  // console.log(data)xw
  for (project of data){
    console.log(project.title)
    // const card = document.createElement("project-card")
    // card.setAttribute("title", project.title);
    // card.setAttribute("description", project.description);
    // card.setAttribute("img", project.img);
    // card.setAttribute("alt", project.alt);
    
    output.innerHTML+=`<project-card title="${project.title}" description="${project.description}" 
    img="${project.img}" alt=${project.alt}
    link="${project.link}"></project-card>`
  }
  
})

let remoteBtn = document.getElementById("remoteBtn");
remoteBtn.addEventListener("click", function(){
  output.innerHTML = "";
  fetch("https://my-json-server.typicode.com/yyYiran/CSE134B-hw4-part2/data")
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    for (project of data){
      output.innerHTML+=`<project-card title="${project.title}" description="${project.description}" 
    img="${project.img}" alt=${project.alt}
    link="${project.link}"></project-card>`
    }
  })
  .catch(error => {
    console.error("Error", error)
  })
})


