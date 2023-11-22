(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const partsinfo = document.querySelector("#partsinfo");

  let spinner = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <g>
    <circle cx="60" cy="50" r="4" fill="#e15b64">
      <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s"></animate>
      <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s"></animate>
    </circle>
    <circle cx="60" cy="50" r="4" fill="#e15b64">
      <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s"></animate>
      <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s"></animate>
    </circle>
    <circle cx="60" cy="50" r="4" fill="#e15b64">
      <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s"></animate>
      <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s"></animate>
    </circle>
  </g><g transform="translate(-15 0)">
    <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a" transform="rotate(90 50 50)"></path>
    <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
    </path>
    <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f8b26a">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
    </path>
  </g>`
  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  //functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infobuds => {
        infobuds.forEach((info, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement('h2');
          titleElement.textContent = info.heading;

          const textElement = document.createElement('p');
          textElement.textContent = info.description;

          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
        
      })
      .catch(error => console.error(error));
      
    //make AJAX call here
  }

  loadInfoBoxes();

  function loadMaterialInfo() {
    partsinfo.innerHTML = spinner;

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(infoMat => {
        infoMat.forEach(material => {
          // Clone the template content
          const clone = materialTemplate.content.cloneNode(true);
          //const clone = document.importNode(materialTemplate.content, true);

          // Populate the cloned template with data
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          // Append the populated template to the list
          materialList.appendChild(clone);
        });
        partsinfo.innerHTML = ""
        partsinfo.appendChild(materialList)
      })

      .catch(error => console.error(error));
    

    //make AJAX Call here
  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
  

})();
