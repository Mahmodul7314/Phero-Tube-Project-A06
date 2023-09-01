const handleCategory = async() =>{
   const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
   const data = await response.json();

   categoryItems = data.data;
   const tabContainer =document.getElementById('tab-container');
  
   categoryItems.forEach((tabCategory) => {
   const div = document.createElement('div');
   div.innerHTML =`
   <button onclick=" loadVideos('${tabCategory.category_id}')" class="btn text-base text-[#252525B3]  lg:font-semibold font-normal" id="btn-category">${tabCategory.category}</button>
   

   `;
    
   tabContainer.appendChild(div);

   });

   
}

//load video if the button clicked
const loadVideos = async(categoryId) =>{
//console.log(categoryId);
const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
const data = await response.json();
const videos = data?.data;
console.log(videos);

// condition if drawing click show There have no data found
if(videos.length>0){
  const videoContainer = document.getElementById('card-container');
  document.getElementById('card-container').classList.add('grid');
  document.getElementById('card-container').classList.add('gap-4');
  document.getElementById('card-container').classList.add('grid-cols-1');
  document.getElementById('card-container').classList.add('md:grid-cols-2');
  document.getElementById('card-container').classList.add('lg:grid-cols-4');
 
 

  videoContainer.innerHTML = "";
  
  videos.forEach((video) =>{
    const div = document.createElement('div');
  
  
    div.innerHTML=`
    <div class="card">
    <div class=" align-top w-full ">
    <figure class="w-full h-40 flex align-top rounded-2xl"><img src="${video.thumbnail}" alt="video" /></figure>
    </div>
    <div class="card-body px-8">
      <div class="flex gap-4 justify-start items-center">
        <div class=" rounded-full">
          <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="" srcset="">
     
           </div>
           <h2 class="card-title font-bold text-lg text-[#171717]">${video.title} </h2> 
      </div>
      <div class="flex justify-start items-center lg:text-center text-left  lg:px-10 md: md:px-16  px-24">
        <p class="text-sm font-normal text-[#111111B3]">${video.authors[0].profile_name} </p>
        <img class="" src="${video.authors[0].verified? video.authors[0].verified:'images/icon.svg'}" alt="" srcset="">
      
      </div>
      <div class=" justify-left">
        <h4></h4>
        <img src="" alt="">
       
      </div>
      <h3 class="lg:pl-14 md:pl-16 pl-24 font-normal text-sm">${video.others.views? video.others.views:'No views'} views</h3>
    </div>
    </div>
          
    `;
  
    videoContainer.appendChild(div);
  })
  

}else{
  const videoContainer = document.getElementById('card-container');
 videoContainer.removeAttribute('class')
  
  videoContainer.innerHTML = "";
  const div = document.createElement('div');

  div.innerHTML=`
  <div class=" flex w-full mx-auto justify-center items-center "> 
  <div>
  <img class=" justify-center items-center mt-4 pl-20" src ="images/Icon.png" alt="" id="">
  <h2 class="text-center text-3xl mt-4 font-bold">Oops!! Sorry, There is no <br> content here</h2>
  </div>
  </div>
  `;
  videoContainer.appendChild(div);
}



}





handleCategory();
loadVideos('1000')