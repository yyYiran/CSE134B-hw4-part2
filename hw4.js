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
        width: 500px;
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
