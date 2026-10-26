const space0 = document.getElementById("today-in-space");
const date = document.getElementById("apod-date");
const btnToday = document.getElementById("today-apod-btn");
const imgContainer = document.getElementById("apod-image-container");
const loading = document.getElementById("apod-loading");
const img = document.getElementById("apod-image");
const title = document.getElementById("apod-title");
const detail = document.getElementById("apod-date-detail");
const explanation = document.getElementById("apod-explanation");
const copyright = document.getElementById("apod-copyright");
const dateInfo = document.getElementById("apod-date-info");
const type = document.getElementById("apod-media-type");
const btn99 = document.querySelector(".btn99");
const dateInput = document.getElementById("apod-date-input");
const loadBtn = document.getElementById("load-date-btn");
const dateInputSpan = document.querySelector(".date-input-wrapper span");
let finalData = {};
function formatSpanDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
async function space(searchDate = "") {
  try {
    loading.classList.remove("hidden");
    img.classList.add("hidden");
    let apiUrl = "https://api.nasa.gov/planetary/apod?api_key=ZyD233eybYx4nbD7UJ0y3x2J46GW5Ykx4Af9DmcH";
    if (searchDate) {
      apiUrl += `&date=${searchDate}`;
    }
    let response = await fetch(apiUrl);
    let data = await response.json();
    finalData = data;
    displaySpace();
    date.innerHTML = `Astronomy Picture of the Day - ${finalData.date}`;
    dateInput.value = finalData.date;
    dateInputSpan.innerHTML = formatSpanDate(finalData.date);
    loading.classList.add("hidden");
    img.classList.remove("hidden");
  } catch (error) {
    console.log(error);
  }
}
space();
function displaySpace() {
  img.setAttribute("src", finalData.hdurl || finalData.url);
  img.setAttribute("alt", finalData.title);
  title.innerHTML = finalData.title;
  detail.innerHTML = `<i class="far fa-calendar mr-2"></i>${finalData.date}`;
  explanation.innerHTML = finalData.explanation;
  copyright.innerHTML = finalData.copyright ? `&copy; ${finalData.copyright}` : '';
  dateInfo.innerHTML = finalData.date;
  type.innerHTML = finalData.media_type;
}
btn99.addEventListener('click', () => {
  window.open(finalData.hdurl || finalData.url, "noopener,noreferrer");
});
btnToday.addEventListener('click', () => {
  space();
});
loadBtn.addEventListener('click', () => {
  const selectedDate = dateInput.value;
  if (selectedDate) {
    space(selectedDate);
  } else {
    alert("Please select a date first!");
  }
})
dateInput.addEventListener('change', (e) => {
  if (e.target.value) {
    dateInputSpan.innerHTML = formatSpanDate(e.target.value);
  }
});

// ========= Lauches =========

let finalData2 = []
async function launches() {
  try {
    let response = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10")
    let data = await response.json()
    finalData2 = data.results
    displayLaunch()
  } catch (error) {
    console.log(error);

  }
}
launches()

function displayLaunch() {
  function upcoming() {
    let dateObj = new Date(finalData2[0].net);
    let formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    let formattedTime = dateObj.toLocaleTimeString('en-US');

    let defaultImg = "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    let launchImg = finalData2[0].image ? finalData2[0].image : defaultImg;

    let cratona = `
            <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
              <div class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                        Go
                      </span>
                    </div>
                    
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${finalData2[0].name}
                    </h3>
                    
                    <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${finalData2[0].launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${finalData2[0].rocket ? finalData2[0].rocket.configuration.name : 'Rocket'}</span>
                      </div>
                    </div>

                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${formattedDate}</p>
                      </div>
                      
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${formattedTime}</p>
                      </div>
                      
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm line-clamp-1">${finalData2[0].pad.location.name}</p>
                      </div>
                      
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${finalData2[0].pad.country.name}</p>
                      </div>
                    </div>
                    
                    <p class="text-slate-300 leading-relaxed mb-6 line-clamp-3">
                      ${finalData2[0].mission ? finalData2[0].mission.description : 'No description available for this mission.'}
                    </p>
                  </div>
                  
                  <div class="flex flex-col md:flex-row gap-3">
                    <button class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                        <i class="far fa-heart"></i>
                      </button>
                      <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="relative">
                  <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
                    
                    <img src="${launchImg}" alt="${finalData2[0].name}" class="absolute inset-0 w-full h-full object-cover" />
                    
                    <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>`;

    document.getElementById("featured-launch").innerHTML = cratona;
  }
  function allUpcoming() {
    let cartona = ``;
    for (let i = 1; i < finalData2.length; i++) {
      let dateObj = new Date(finalData2[i].net);
      let formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      let formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      let imageContent = finalData2[i].image
        ? `<img src="${finalData2[i].image.image_url}" alt="${finalData2[i].name}" class="w-full h-full object-cover" />`
        : `<img src="./assets/images/launch-placeholder.png" alt="Placeholder" class="w-full h-full object-cover" />`;

      let statusName = finalData2[i].status ? finalData2[i].status.abbrev : 'TBD';
      let statusColor = statusName === 'Go' ? 'bg-green-500/90' : (statusName === 'TBD' ? 'bg-blue-500/90' : 'bg-yellow-500/90');

      cartona += `
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer flex flex-col">
              <div class="relative h-48 bg-slate-900/50 flex items-center justify-center overflow-hidden">
                ${imageContent}
                <div class="absolute top-3 right-3">
                  <span class="px-3 py-1 ${statusColor} text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                    ${statusName}
                  </span>
                </div>
              </div>
              <div class="p-5 flex flex-col flex-1">
                <div class="mb-3">
                  <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors" title="${finalData2[i].name}">
                    ${finalData2[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${finalData2[i].launch_service_provider ? finalData2[i].launch_service_provider.name : 'Unknown'}
                  </p>
                </div>
                <div class="space-y-2 mb-4 flex-1">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedDate}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedTime}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${finalData2[i].rocket ? finalData2[i].rocket.configuration.name : 'Rocket'}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1" title="${finalData2[i].pad.location.name}">
                      ${finalData2[i].pad.location.name}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-2 pt-4 border-t border-slate-700 mt-auto">
                  <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                    Details
                  </button>
                  <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`;
    }
    document.getElementById("launches-grid").innerHTML = cartona;
  }

  if (finalData2.length > 0) {
    upcoming();
    allUpcoming();
  }
}

// ========= Planets =========

let finalData3 = []
async function planets() {
  try {
    let respnose = await fetch('https://solar-system-opendata-proxy.vercel.app/api/planets')
    let data = await respnose.json()
    finalData3 = data
    dispalyPlanets();
    displayPlanetTable();
  } catch (error) {

  }
}

planets()

function dispalyPlanets() {
  let btns = document.querySelectorAll(".planet-card")
      let cartona2 = `          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
                <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                  <img id="planet-detail-image" class="w-full h-full object-contain" src="${finalData3.bodies[6].image}"
                    alt="${finalData3.bodies[6].englishName} planet" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                      ${finalData3.bodies[6].englishName}
                    </h3>
                    <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    ${finalData3.bodies[6].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                    ${(finalData3.bodies[6].semimajorAxis / 1000000).toFixed(1)} M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${finalData3.bodies[6].polarRadius} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${finalData3.bodies[6].mass.massValue} × 10<sup>${finalData3.bodies[6].mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${finalData3.bodies[6].density.toFixed(2)} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${finalData3.bodies[6].sideralOrbit.toFixed(2)} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${finalData3.bodies[6].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${finalData3.bodies[6].moons === null ? "0" : finalData3.bodies[6].moons.length}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${finalData3.bodies[6].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovered By</span>
                    <span id="planet-discoverer" class="font-semibold text-right">${finalData3.bodies[6].discoveredBy === "" ? "Known since antiquity" : finalData3.bodies[6].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold">${finalData3.bodies[6].discoveredBy === "" ? "Ancient" : finalData3.bodies[6].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold">${finalData3.bodies[6].bodyType}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${finalData3.bodies[6].vol.volValue} x 10<sup>${finalData3.bodies[6].vol.volExponent}</sup> km<sup>3</sup></span>
                  </div>
                </div>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Mass: ${finalData3.bodies[6].mass.massValue} × 10<sup>${finalData3.bodies[6].mass.massExponent}</sup> kg</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Surface gravity: ${finalData3.bodies[6].gravity} m/s²</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Density: ${finalData3.bodies[6].density.toFixed(2)} g/cm³</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Axial tilt: ${finalData3.bodies[6].axialTilt}°</span>
                  </li>
                </ul>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold">${(finalData3.bodies[6].perihelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold">${(finalData3.bodies[6].aphelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold">${finalData3.bodies[6].eccentricity}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold">${finalData3.bodies[6].inclination.toFixed(2)}°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold">${Math.round(finalData3.bodies[6].axialTilt) }°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${finalData3.bodies[6].avgTemp === 0 ? 'N/A' : finalData3.bodies[6].avgTemp }°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold">${finalData3.bodies[6].escape / 1000} km/s</span>
                  </div>
                </div>
              </div>
              <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
          </div>`
    document.getElementById("innerData").innerHTML = cartona2
  btns[0].addEventListener('click', () => {
    let cartona = `          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
                <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                  <img id="planet-detail-image" class="w-full h-full object-contain" src="${finalData3.bodies[4].image}"
                    alt="${finalData3.bodies[4].englishName} planet" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                      ${finalData3.bodies[4].englishName}
                    </h3>
                    <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    ${finalData3.bodies[4].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                    ${(finalData3.bodies[4].semimajorAxis / 1000000).toFixed(1)} M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${finalData3.bodies[4].polarRadius} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${finalData3.bodies[4].mass.massValue} × 10<sup>${finalData3.bodies[4].mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${finalData3.bodies[4].density.toFixed(2)} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${finalData3.bodies[4].sideralOrbit.toFixed(2)} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${finalData3.bodies[4].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${finalData3.bodies[4].moons === null ? "0" : finalData3.bodies[4].moons.length}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${finalData3.bodies[4].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovered By</span>
                    <span id="planet-discoverer" class="font-semibold text-right">${finalData3.bodies[4].discoveredBy === "" ? "Known since antiquity" : finalData3.bodies[4].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold">${finalData3.bodies[4].discoveredBy === "" ? "Ancient" : finalData3.bodies[4].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold">${finalData3.bodies[4].bodyType}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${finalData3.bodies[4].vol.volValue} x 10<sup>${finalData3.bodies[4].vol.volExponent}</sup> km<sup>3</sup></span>
                  </div>
                </div>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Mass: ${finalData3.bodies[4].mass.massValue} × 10<sup>${finalData3.bodies[4].mass.massExponent}</sup> kg</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Surface gravity: ${finalData3.bodies[4].gravity} m/s²</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Density: ${finalData3.bodies[4].density.toFixed(2)} g/cm³</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Axial tilt: ${finalData3.bodies[4].axialTilt}°</span>
                  </li>
                </ul>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold">${(finalData3.bodies[4].perihelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold">${(finalData3.bodies[4].aphelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold">${finalData3.bodies[4].eccentricity}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold">${finalData3.bodies[4].inclination.toFixed(2)}°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold">${Math.round(finalData3.bodies[4].axialTilt) }°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${finalData3.bodies[4].avgTemp === 0 ? 'N/A' : finalData3.bodies[4].avgTemp }°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold">${finalData3.bodies[4].escape / 1000} km/s</span>
                  </div>
                </div>
              </div>
              <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
          </div>`
    document.getElementById("innerData").innerHTML = cartona
  })
  btns[1].addEventListener('click', () => {
    let cartona = `          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
                <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                  <img id="planet-detail-image" class="w-full h-full object-contain" src="${finalData3.bodies[7].image}"
                    alt="${finalData3.bodies[7].englishName} planet" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                      ${finalData3.bodies[7].englishName}
                    </h3>
                    <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    ${finalData3.bodies[7].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                    ${(finalData3.bodies[7].semimajorAxis / 1000000).toFixed(1)} M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${finalData3.bodies[7].polarRadius} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${finalData3.bodies[7].mass.massValue} × 10<sup>${finalData3.bodies[7].mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${finalData3.bodies[7].density.toFixed(2)} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${finalData3.bodies[7].sideralOrbit.toFixed(2)} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${finalData3.bodies[7].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${finalData3.bodies[7].moons === null ? "0" : finalData3.bodies[7].moons.length}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${finalData3.bodies[7].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovered By</span>
                    <span id="planet-discoverer" class="font-semibold text-right">${finalData3.bodies[7].discoveredBy === "" ? "Known since antiquity" : finalData3.bodies[7].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold">${finalData3.bodies[7].discoveredBy === "" ? "Ancient" : finalData3.bodies[7].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold">${finalData3.bodies[7].bodyType}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${finalData3.bodies[7].vol.volValue} x 10<sup>${finalData3.bodies[7].vol.volExponent}</sup> km<sup>3</sup></span>
                  </div>
                </div>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Mass: ${finalData3.bodies[7].mass.massValue} × 10<sup>${finalData3.bodies[7].mass.massExponent}</sup> kg</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Surface gravity: ${finalData3.bodies[7].gravity} m/s²</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Density: ${finalData3.bodies[7].density.toFixed(2)} g/cm³</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Axial tilt: ${finalData3.bodies[7].axialTilt}°</span>
                  </li>
                </ul>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold">${(finalData3.bodies[7].perihelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold">${(finalData3.bodies[7].aphelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold">${finalData3.bodies[7].eccentricity}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold">${finalData3.bodies[7].inclination.toFixed(2)}°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold">${Math.round(finalData3.bodies[7].axialTilt) }°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${finalData3.bodies[7].avgTemp === 0 ? 'N/A' : finalData3.bodies[7].avgTemp }°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold">${finalData3.bodies[7].escape / 1000} km/s</span>
                  </div>
                </div>
              </div>
              <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
          </div>`
    document.getElementById("innerData").innerHTML = cartona
  })
  btns[2].addEventListener('click', () => {
    let cartona = `          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
                <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                  <img id="planet-detail-image" class="w-full h-full object-contain" src="${finalData3.bodies[6].image}"
                    alt="${finalData3.bodies[6].englishName} planet" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                      ${finalData3.bodies[6].englishName}
                    </h3>
                    <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    ${finalData3.bodies[6].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                    ${(finalData3.bodies[6].semimajorAxis / 1000000).toFixed(1)} M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${finalData3.bodies[6].polarRadius} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${finalData3.bodies[6].mass.massValue} × 10<sup>${finalData3.bodies[6].mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${finalData3.bodies[6].density.toFixed(2)} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${finalData3.bodies[6].sideralOrbit.toFixed(2)} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${finalData3.bodies[6].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${finalData3.bodies[6].moons === null ? "0" : finalData3.bodies[6].moons.length}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${finalData3.bodies[6].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovered By</span>
                    <span id="planet-discoverer" class="font-semibold text-right">${finalData3.bodies[6].discoveredBy === "" ? "Known since antiquity" : finalData3.bodies[6].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold">${finalData3.bodies[6].discoveredBy === "" ? "Ancient" : finalData3.bodies[6].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold">${finalData3.bodies[6].bodyType}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${finalData3.bodies[6].vol.volValue} x 10<sup>${finalData3.bodies[6].vol.volExponent}</sup> km<sup>3</sup></span>
                  </div>
                </div>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Mass: ${finalData3.bodies[6].mass.massValue} × 10<sup>${finalData3.bodies[6].mass.massExponent}</sup> kg</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Surface gravity: ${finalData3.bodies[6].gravity} m/s²</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Density: ${finalData3.bodies[6].density.toFixed(2)} g/cm³</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Axial tilt: ${finalData3.bodies[6].axialTilt}°</span>
                  </li>
                </ul>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold">${(finalData3.bodies[6].perihelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold">${(finalData3.bodies[6].aphelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold">${finalData3.bodies[6].eccentricity}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold">${finalData3.bodies[6].inclination.toFixed(2)}°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold">${Math.round(finalData3.bodies[6].axialTilt) }°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${finalData3.bodies[6].avgTemp === 0 ? 'N/A' : finalData3.bodies[6].avgTemp }°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold">${finalData3.bodies[6].escape / 1000} km/s</span>
                  </div>
                </div>
              </div>
              <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
          </div>`
    document.getElementById("innerData").innerHTML = cartona
  })
  btns[3].addEventListener('click', () => {
    let cartona = `          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
                <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                  <img id="planet-detail-image" class="w-full h-full object-contain" src="${finalData3.bodies[3].image}"
                    alt="${finalData3.bodies[3].englishName} planet" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                      ${finalData3.bodies[3].englishName}
                    </h3>
                    <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    ${finalData3.bodies[3].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                    ${(finalData3.bodies[3].semimajorAxis / 1000000).toFixed(1)} M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${finalData3.bodies[3].polarRadius} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${finalData3.bodies[3].mass.massValue} × 10<sup>${finalData3.bodies[3].mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${finalData3.bodies[3].density.toFixed(2)} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${finalData3.bodies[3].sideralOrbit.toFixed(2)} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${finalData3.bodies[3].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${finalData3.bodies[3].moons === null ? "0" : finalData3.bodies[3].moons.length}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${finalData3.bodies[3].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovered By</span>
                    <span id="planet-discoverer" class="font-semibold text-right">${finalData3.bodies[3].discoveredBy === "" ? "Known since antiquity" : finalData3.bodies[3].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold">${finalData3.bodies[3].discoveredBy === "" ? "Ancient" : finalData3.bodies[3].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold">${finalData3.bodies[3].bodyType}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${finalData3.bodies[3].vol.volValue} x 10<sup>${finalData3.bodies[3].vol.volExponent}</sup> km<sup>3</sup></span>
                  </div>
                </div>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Mass: ${finalData3.bodies[3].mass.massValue} × 10<sup>${finalData3.bodies[3].mass.massExponent}</sup> kg</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Surface gravity: ${finalData3.bodies[3].gravity} m/s²</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Density: ${finalData3.bodies[3].density.toFixed(2)} g/cm³</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Axial tilt: ${finalData3.bodies[3].axialTilt}°</span>
                  </li>
                </ul>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold">${(finalData3.bodies[3].perihelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold">${(finalData3.bodies[3].aphelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold">${finalData3.bodies[3].eccentricity}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold">${finalData3.bodies[3].inclination.toFixed(2)}°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold">${Math.round(finalData3.bodies[3].axialTilt) }°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${finalData3.bodies[3].avgTemp === 0 ? 'N/A' : finalData3.bodies[3].avgTemp }°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold">${finalData3.bodies[3].escape / 1000} km/s</span>
                  </div>
                </div>
              </div>
              <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
          </div>`
    document.getElementById("innerData").innerHTML = cartona
  })
  btns[4].addEventListener('click', () => {
    let cartona = `          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
                <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                  <img id="planet-detail-image" class="w-full h-full object-contain" src="${finalData3.bodies[2].image}"
                    alt="${finalData3.bodies[2].englishName} planet" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                      ${finalData3.bodies[2].englishName}
                    </h3>
                    <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    ${finalData3.bodies[2].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                    ${(finalData3.bodies[2].semimajorAxis / 1000000).toFixed(1)} M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${finalData3.bodies[2].polarRadius} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${finalData3.bodies[2].mass.massValue} × 10<sup>${finalData3.bodies[2].mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${finalData3.bodies[2].density.toFixed(2)} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${finalData3.bodies[2].sideralOrbit.toFixed(2)} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${finalData3.bodies[2].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${finalData3.bodies[2].moons === null ? "0" : finalData3.bodies[2].moons.length}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${finalData3.bodies[2].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovered By</span>
                    <span id="planet-discoverer" class="font-semibold text-right">${finalData3.bodies[2].discoveredBy === "" ? "Known since antiquity" : finalData3.bodies[2].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold">${finalData3.bodies[2].discoveredBy === "" ? "Ancient" : finalData3.bodies[2].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold">${finalData3.bodies[2].bodyType}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${finalData3.bodies[2].vol.volValue} x 10<sup>${finalData3.bodies[2].vol.volExponent}</sup> km<sup>3</sup></span>
                  </div>
                </div>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Mass: ${finalData3.bodies[2].mass.massValue} × 10<sup>${finalData3.bodies[2].mass.massExponent}</sup> kg</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Surface gravity: ${finalData3.bodies[2].gravity} m/s²</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Density: ${finalData3.bodies[2].density.toFixed(2)} g/cm³</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Axial tilt: ${finalData3.bodies[2].axialTilt}°</span>
                  </li>
                </ul>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold">${(finalData3.bodies[2].perihelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold">${(finalData3.bodies[2].aphelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold">${finalData3.bodies[2].eccentricity}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold">${finalData3.bodies[2].inclination.toFixed(2)}°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold">${Math.round(finalData3.bodies[2].axialTilt) }°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${finalData3.bodies[2].avgTemp === 0 ? 'N/A' : finalData3.bodies[2].avgTemp }°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold">${finalData3.bodies[2].escape / 1000} km/s</span>
                  </div>
                </div>
              </div>
              <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
          </div>`
    document.getElementById("innerData").innerHTML = cartona
  })
  btns[5].addEventListener('click', () => {
    let cartona = `          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
                <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                  <img id="planet-detail-image" class="w-full h-full object-contain" src="${finalData3.bodies[5].image}"
                    alt="${finalData3.bodies[5].englishName} planet" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                      ${finalData3.bodies[5].englishName}
                    </h3>
                    <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    ${finalData3.bodies[5].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                    ${(finalData3.bodies[5].semimajorAxis / 1000000).toFixed(1)} M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${finalData3.bodies[5].polarRadius} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${finalData3.bodies[5].mass.massValue} × 10<sup>${finalData3.bodies[5].mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${finalData3.bodies[5].density.toFixed(2)} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${finalData3.bodies[5].sideralOrbit.toFixed(2)} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${finalData3.bodies[5].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${finalData3.bodies[5].moons === null ? "0" : finalData3.bodies[5].moons.length}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${finalData3.bodies[5].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovered By</span>
                    <span id="planet-discoverer" class="font-semibold text-right">${finalData3.bodies[5].discoveredBy === "" ? "Known since antiquity" : finalData3.bodies[5].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold">${finalData3.bodies[5].discoveredBy === "" ? "Ancient" : finalData3.bodies[5].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold">${finalData3.bodies[5].bodyType}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${finalData3.bodies[5].vol.volValue} x 10<sup>${finalData3.bodies[5].vol.volExponent}</sup> km<sup>3</sup></span>
                  </div>
                </div>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Mass: ${finalData3.bodies[5].mass.massValue} × 10<sup>${finalData3.bodies[5].mass.massExponent}</sup> kg</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Surface gravity: ${finalData3.bodies[5].gravity} m/s²</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Density: ${finalData3.bodies[5].density.toFixed(2)} g/cm³</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Axial tilt: ${finalData3.bodies[5].axialTilt}°</span>
                  </li>
                </ul>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold">${(finalData3.bodies[5].perihelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold">${(finalData3.bodies[5].aphelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold">${finalData3.bodies[5].eccentricity}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold">${finalData3.bodies[5].inclination.toFixed(2)}°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold">${Math.round(finalData3.bodies[5].axialTilt) }°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${finalData3.bodies[5].avgTemp === 0 ? 'N/A' : finalData3.bodies[5].avgTemp }°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold">${finalData3.bodies[5].escape / 1000} km/s</span>
                  </div>
                </div>
              </div>
              <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
          </div>`
    document.getElementById("innerData").innerHTML = cartona
  })
  btns[6].addEventListener('click', () => {
    let cartona = `          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
                <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                  <img id="planet-detail-image" class="w-full h-full object-contain" src="${finalData3.bodies[0].image}"
                    alt="${finalData3.bodies[0].englishName} planet" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                      ${finalData3.bodies[0].englishName}
                    </h3>
                    <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    ${finalData3.bodies[0].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                    ${(finalData3.bodies[0].semimajorAxis / 1000000).toFixed(1)} M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${finalData3.bodies[0].polarRadius} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${finalData3.bodies[0].mass.massValue} × 10<sup>${finalData3.bodies[0].mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${finalData3.bodies[0].density.toFixed(2)} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${finalData3.bodies[0].sideralOrbit.toFixed(2)} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${finalData3.bodies[0].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${finalData3.bodies[0].moons === null ? "0" : finalData3.bodies[0].moons.length}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${finalData3.bodies[0].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovered By</span>
                    <span id="planet-discoverer" class="font-semibold text-right">${finalData3.bodies[0].discoveredBy === "" ? "Known since antiquity" : finalData3.bodies[0].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold">${finalData3.bodies[0].discoveredBy === "" ? "Ancient" : finalData3.bodies[0].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold">${finalData3.bodies[0].bodyType}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${finalData3.bodies[0].vol.volValue} x 10<sup>${finalData3.bodies[0].vol.volExponent}</sup> km<sup>3</sup></span>
                  </div>
                </div>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Mass: ${finalData3.bodies[0].mass.massValue} × 10<sup>${finalData3.bodies[0].mass.massExponent}</sup> kg</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Surface gravity: ${finalData3.bodies[0].gravity} m/s²</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Density: ${finalData3.bodies[0].density.toFixed(2)} g/cm³</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Axial tilt: ${finalData3.bodies[0].axialTilt}°</span>
                  </li>
                </ul>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold">${(finalData3.bodies[0].perihelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold">${(finalData3.bodies[0].aphelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold">${finalData3.bodies[0].eccentricity}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold">${finalData3.bodies[0].inclination.toFixed(2)}°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold">${Math.round(finalData3.bodies[0].axialTilt) }°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${finalData3.bodies[0].avgTemp === 0 ? 'N/A' : finalData3.bodies[0].avgTemp }°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold">${finalData3.bodies[0].escape / 1000} km/s</span>
                  </div>
                </div>
              </div>
              <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
          </div>`
    document.getElementById("innerData").innerHTML = cartona
  })
  btns[7].addEventListener('click', () => {
    let cartona = `          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
                <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                  <img id="planet-detail-image" class="w-full h-full object-contain" src="${finalData3.bodies[1].image}"
                    alt="${finalData3.bodies[1].englishName} planet" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                      ${finalData3.bodies[1].englishName}
                    </h3>
                    <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    ${finalData3.bodies[1].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                    ${(finalData3.bodies[1].semimajorAxis / 1000000).toFixed(1)} M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${finalData3.bodies[1].polarRadius} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${finalData3.bodies[1].mass.massValue} × 10<sup>${finalData3.bodies[1].mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${finalData3.bodies[1].density.toFixed(2)} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${finalData3.bodies[1].sideralOrbit.toFixed(2)} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${finalData3.bodies[1].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${finalData3.bodies[1].moons === null ? "0" : finalData3.bodies[1].moons.length}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${finalData3.bodies[1].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovered By</span>
                    <span id="planet-discoverer" class="font-semibold text-right">${finalData3.bodies[1].discoveredBy === "" ? "Known since antiquity" : finalData3.bodies[1].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold">${finalData3.bodies[1].discoveredBy === "" ? "Ancient" : finalData3.bodies[1].discoveredBy}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold">${finalData3.bodies[1].bodyType}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${finalData3.bodies[1].vol.volValue} x 10<sup>${finalData3.bodies[1].vol.volExponent}</sup> km<sup>3</sup></span>
                  </div>
                </div>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Mass: ${finalData3.bodies[1].mass.massValue} × 10<sup>${finalData3.bodies[1].mass.massExponent}</sup> kg</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Surface gravity: ${finalData3.bodies[1].gravity} m/s²</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Density: ${finalData3.bodies[1].density.toFixed(2)} g/cm³</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">Axial tilt: ${finalData3.bodies[1].axialTilt}°</span>
                  </li>
                </ul>
              </div>
              <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold">${(finalData3.bodies[1].perihelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold">${(finalData3.bodies[1].aphelion / 1000000).toFixed(1)} M km</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold">${finalData3.bodies[1].eccentricity}</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold">${finalData3.bodies[1].inclination.toFixed(2)}°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold">${Math.round(finalData3.bodies[1].axialTilt) }°</span>
                  </div>
                  <div class="flex justify-between items-center py-2 border-b border-slate-700">
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${finalData3.bodies[1].avgTemp === 0 ? 'N/A' : finalData3.bodies[1].avgTemp }°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold">${finalData3.bodies[1].escape / 1000} km/s</span>
                  </div>
                </div>
              </div>
              <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
          </div>`
    document.getElementById("innerData").innerHTML = cartona
  })

}

function displayPlanetTable() {
  const tbody = document.getElementById("planet-comparison-tbody");

  const planetOrder = [
    "Uranus", "Neptune", "Jupiter", "Mars", 
    "Mercury", "Saturn", "Earth", "Venus"
  ];

const planetStyles = {
    "Uranus": { dot: "#06b6d4", type: "Ice Giant", badge: "bg-blue-500/20", textColor: "#60a5fa" }, // text-blue-400
    "Neptune": { dot: "#2563eb", type: "Ice Giant", badge: "bg-blue-500/20", textColor: "#60a5fa" },
    "Jupiter": { dot: "#fb923c", type: "Gas Giant", badge: "bg-purple-500/20", textColor: "#c084fc" }, // text-purple-400
    "Mars": { dot: "#ef4444", type: "Terrestrial", badge: "bg-orange-500/20", textColor: "#fb923c" }, // text-orange-400
    "Mercury": { dot: "#9ca3af", type: "Terrestrial", badge: "bg-orange-500/20", textColor: "#fb923c" },
    "Saturn": { dot: "#facc15", type: "Gas Giant", badge: "bg-purple-500/20", textColor: "#c084fc" },
    "Earth": { dot: "#3b82f6", type: "Terrestrial", badge: "bg-orange-500/20", textColor: "#fb923c" },
    "Venus": { dot: "#f97316", type: "Terrestrial", badge: "bg-orange-500/20", textColor: "#fb923c" }
  };

  let tableHTML = "";

  planetOrder.forEach(planetName => {
    let planet = finalData3.bodies.find(p => p.englishName === planetName);
    if(!planet) return;
    
    let style = planetStyles[planetName];
    
    let distanceAU = (planet.semimajorAxis / 149597870.7).toFixed(2); 
    let diameter = Math.round(planet.equaRadius * 2).toLocaleString('en-US');
    let massRelative = (planet.mass.massValue * Math.pow(10, planet.mass.massExponent) / 5.972e24).toFixed(3);
    
    let orbitalPeriod = "";
    let earthDays = planet.sideralOrbit;
    
    if (planetName === "Earth") {
        orbitalPeriod = "1.0 years";
    } else if (earthDays > 365) {
        orbitalPeriod = (earthDays / 365.25).toFixed(1) + " years";
    } else {
        orbitalPeriod = Math.round(earthDays) + " days";
    }
    
    let moonsCount = planet.moons ? planet.moons.length : 0;

    tableHTML += `
      <tr class="hover:bg-slate-800/30 transition-colors">
        <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 rounded-full flex-shrink-0" style="background-color: ${style.dot}"></div>
            <span class="font-semibold text-sm md:text-base whitespace-nowrap">${planet.englishName}</span>
          </div>
        </td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${distanceAU}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${diameter}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${massRelative}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${orbitalPeriod}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${moonsCount}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
          <span class="px-3 py-1 rounded text-xs font-medium ${style.badge}" style="color: ${style.textColor}">${style.type}</span>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = tableHTML;
}

// ========= Active sidebar =========

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.app-section');
const sidebar = document.getElementById("sidebar")
const sidebarToggle = document.getElementById("sidebar-toggle")
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        navLinks.forEach(nav => {
            nav.classList.remove('bg-blue-500/10', 'text-blue-400');
            nav.classList.add('text-slate-300', 'hover:bg-slate-800');
        });

        this.classList.remove('text-slate-300', 'hover:bg-slate-800');
        this.classList.add('bg-blue-500/10', 'text-blue-400');

        sections.forEach(section => {
            section.classList.add('hidden');
        });

        const targetSectionId = this.getAttribute('data-section');
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
    });
});
sidebarToggle.addEventListener('click', (event) => {
  event.stopPropagation(); 
  sidebar.classList.add("sidebar-open");
});

document.body.addEventListener('click', (event) => {
  if (!sidebar.contains(event.target)) {
    sidebar.classList.remove("sidebar-open");
  }
});























