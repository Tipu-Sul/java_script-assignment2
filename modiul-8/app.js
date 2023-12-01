const All=async (id)=>{
   await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  .then(res=>res.json())
  .then((data)=>{
    EmptyDisplay();
    contentDisplay(data.data);
  })
};

const SortView= async(sortId)=>{
  await fetch(`https://openapi.programming-hero.com/api/videos/category/${sortId}`)
  .then(res=> res.json())
  .then(data=>{
    const sortItems=data.data.sort(function(a,b)
    {return parseInt(b.others.views) - parseInt(a.others.views)});
    EmptyDisplay();
    contentDisplay(data.data);
  })
};

const contentDisplay = (videoContent) => {
  const cardContainer = document.getElementById("mainContainer");
  cardContainer.innerHTML = "";

  const noContent = document.getElementById("mainContainer");
  noContent.innerHTML = "";

  if (videoContent.length !== 0) {
      videoContent.forEach((video) => {
          const second = video.others.posted_date;
          const day =Math.floor(second/86400);
          const hours = Math.floor((second-(day* 86400))/ 3600);
          const minutes = Math.floor((second -( hours * 3600)) / 60);

          const div = document.createElement("div");
          div.className = "col-lg-3 col-md-6 mb-4";

          div.innerHTML = `

          <div class="container">
              <div class="row justify-content-center">
                  <figure>
                      <div class = "card position-relative">
                          <img class="img-fluid rounded-md" style="width: auto; height:260px;"  src=${ video.thumbnail ? video.thumbnail : "image not found"} class="card-img-top rounded-md" alt="Loading...." />
        
                      <div class="position-absolute end-0 bottom-0 text-white me-2 mb-1 p-1">       
                         <p class="time bg-dark text-light">${video.others.posted_date?day + " d " + hours + " hrs " + minutes + " mins ago": ""} </p>
                          </div>
                      </div>      
                  </figure>

                  <div class="d-flex align-items-center">
                      <img src="${video.authors[0].profile_picture}" alt="Loading...." class="custom-size mb-5 rounded-circle">
                      <div class="ms-2 align-items-center">
                          <h2 class="fs-6 fw-bold">${video.title}</h2>
                          <h2 class="fs-6 fw-normal">${video.authors[0].profile_name}<span></span></h2>
                          <div class="d-flex align-items-center gap-2">
                              <h2 class="fs-6 fw-normal">${video.others.views} views</h2>
                              <p>${video.authors[0].verified ? '<img class="vrf" src="./PHero-Tube/verification-stamp-icon-vector-23528197.jpg" alt="verified-image">' : ''}</p>
                          </div>
                      </div>
              </div>
          </div>
          `;
          cardContainer.appendChild(div);
      });
  } else {
      const div = document.createElement("div");
      div.className = "mt-10";
      div.innerHTML = `
          <div class="text-center">
              <img src="./PHero-Tube/Icon.png" />
          </div>
          <h3 class="fw-bold text-center display-6">Oops!! Sorry, There is no<br> content here</h3>
      `;
      noContent.appendChild(div);
  }
};


const EmptyDisplay=()=>{
  const mainContainer=document.getElementById("mainContainer");
  mainContainer.innerHTML="";
}

  All(1000);