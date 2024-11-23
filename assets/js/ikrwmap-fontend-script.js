const ikrgooMap = document.querySelector(".svg_img_obj");
const ikr_map_tooltip = document.getElementById("ikr_map_tooltip");
const ikrwmap_details =document.getElementById('ikrwmap_details');


const ikrwmap_output  = document.getElementById("ikrwmap_output");
const ikrwmap_outputs  = document.querySelectorAll(`[data-id="ikrwmap_output"]`);
console.log(ikrwmap_details)


document.addEventListener("DOMContentLoaded", (event) => {
  // Create the SVG element and set attributes
  const ikrwmap_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  ikrwmap_svg.setAttribute("viewBox", "0 0 1000 640");
  
  ikrwmap_svg.setAttribute("id", "svg4");


  

  // Set innerHTML of the SVG to include the path
  ikrwmap_svg.innerHTML = world_map_img;



  // Append the SVG to the output container
  document.getElementById("ikrwmap_output").appendChild(ikrwmap_svg);
 
 // Store the data globally so it can be reused
let mapDataCache = null;

const svg4 = document.getElementById('svg4');
let items = svg4.querySelectorAll("rect, path, circle, polygon");

// Function to fetch and cache data from the database
async function ikrwmap_retrieve_data_from_db() {
  try {
    // Fetch the data from the database
    const response = await world_map_fetchAjaxRequest(
      ikrwmap_get_url.featchdata,
      ikrwmap_get_url.ajax_url
    );

    if (response.length === 0) {
      console.log("No data retrieved from the database.");
      return;
    }

    // Cache the data for later use
    mapDataCache = response;

    // Apply initial styles based on the data
    items.forEach((mapId) => {
      mapDataCache.forEach((data) => {
        if (mapId.id === data.map_id) {
          const setColor = svg4.querySelector(`#${mapId.id}`);
          setColor.style.fill = `${data.fill_color}`;
          setColor.setAttribute("data-img", data.map_img);
          setColor.setAttribute("data-link", data.map_link);
          setColor.setAttribute("data-title", data.map_title);
          setColor.setAttribute("data-desc", data.map_desc);
        }
      });
    });
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

// Initialize the map by retrieving data
ikrwmap_retrieve_data_from_db();

// Add event listeners to the SVG elements
items.forEach((svg_path) => {
  // Click event
  svg_path.addEventListener("click", (ev) => {
    const ct_dataset = ev.target.dataset;
    if (ct_dataset.img || ct_dataset.link || ct_dataset.title || ct_dataset.desc) {
      ikrwmap_details.style.display = "block";
      ikrwmap_details.style.left = ev.pageX + "px";
      ikrwmap_details.style.top = ev.pageY + "px";
      console.log(mapDataCache)
    }
  });

  // Mousemove event
  svg_path.addEventListener("mousemove", (ev) => {
    if (mapDataCache) {
      const hoveredId = ev.target.id;
      const data = mapDataCache.find((d) => d.map_id === hoveredId);
      if (data) {
        // console.log("Hovered data:", data);
        // You can handle the mousemove logic here
      }
    }
  });

  // Mouseout event
  svg_path.addEventListener("mouseout", () => {
    // ikrwmap_details.style.display = "none";
  });
});

});








// ikrgooMap.addEventListener("load", (irkcontent) => {
//   // get the svg
//   const ikrsvgDocc = ikrgooMap.contentDocument;
//   const ikrsvg = ikrsvgDocc.querySelector("svg");

//   // console.log(ikrsvg);
//   let items = ikrsvg.querySelectorAll("rect,path", "circle", "polygon");

//   items.forEach((ev, ind) => {
//     let ids = ev.id;
//     let id = {
//       id: ids,
//     };
//   });

//   // select the svg path
//   // console.log(tab)

//   // map the item to  the dom and  add event listener

//   // items.forEach((svg_path) => {
//   //   svg_path.addEventListener("click", (ev) => {
//   //     console.log(ev.offsetX)
//   //     const ct_dataset = ev.target.dataset;
//   //     if (ct_dataset.img || ct_dataset.link|| ct_dataset.title||ct_dataset.desc ) {
//   //       ikrwmap_details.style.display = "block";
//   //       ikrwmap_details.style.left = ev.pageX + "px";
//   //       ikrwmap_details.style.top = ev.pageY + "px";
//   //     }
//   //   });
//   // });

//   ikrwmap_output.addEventListener('click',(ev) =>{
  
//     const ct_dataset = ev.target.dataset;
//     if (ct_dataset.img || ct_dataset.link|| ct_dataset.title||ct_dataset.desc ) {
//       ikrwmap_details.style.display = "block";
//       ikrwmap_details.style.left = ev.pageX + "px";
//       ikrwmap_details.style.top = ev.pageY + "px";
//     }
//   });

//   async function ikrwmap_retrive_data_from_db() {
//     try {
//       // fetch the data from the db
//       const response = await world_map_fetchAjaxRequest(
//         ikrwmap_get_url.featchdata,
//         ikrwmap_get_url.ajax_url
//       );

//       // console.log(response);
//       // check the  response status code

//       if (response.length == 0) {
//         return;
//       } else {
//         // set the color of  the map based on the data
//         items.forEach((mapId) => {
//           response.forEach((data) => {
//             if (mapId.id == data.map_id) {
//               const setColor = ikrsvg.querySelector(`#${mapId.id}`);

//               setColor.style.fill = `${data.fill_color}`;
//               setColor.setAttribute("data-img", data.map_img);
//             }
//           });
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   ikrwmap_retrive_data_from_db();
// });

function world_map_fetchAjaxRequest(actions, ajaxurl) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", ajaxurl, true);
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        } else {
          reject(xhr.statusText);
        }
      }
    };

    xhr.send(`action=${actions}`);
  });
}
