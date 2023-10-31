let categories = [];
let categoryName = ""
let api = 'https://openapi.programming-hero.com/api/videos/category/1000';

const categoriesDiv = document.getElementById("categories");
function handleButton(category) {
  // api = `https://openapi.programming-hero.com/api/videos/category/${category}`
  // return api

 api = category
 console.log(api);
  
}

fetch("https://openapi.programming-hero.com/api/videos/categories")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.data.length; i++) {
      const buttons = document.createElement("button");
      buttons.textContent = data.data[i].category;
      buttons.className = "btn btn";
      (function(categoryId) {
        buttons.onclick = function () {
          handleButton(categoryId);
        };
      })(data.data[i].category_id);
      categoriesDiv.appendChild(buttons);
    }
    
  });
 
  
  fetch(api).then((res)=>res.json()).then((data)=>{
   data.data.forEach(element => {
    
    const hour =(( element.others.posted_date / 60)/60)
    const minute = hour % 2
   
    const cards = document.getElementById('cards')
    const card = document.createElement('div')
    card.className = 'w-[25%] mt-10'
    card.innerHTML = `
      
        <img class="h-[200px] w-[312px] rounded-md" src=${element.thumbnail} />
        ${element.others.posted_date !== "" ? `<p>${parseInt(hour,10)} Hrs ${minute.toFixed(1).toString().slice(2)} min</p>` : ""}
        
        <div class="flex gap-2 align-center">
            <img class="w-[40px] h-[40px] rounded-full mt-4" src=${element.authors[0].profile_picture} />
            <h1 class="mt-5 font-bold">${element.title}</h1>
        </div>
        <div class="flex">
          <h3 class="text-gray-500 mx-[3rem]">${element.authors[0].profile_name}</h3>
          ${element.authors[0].verified? '<img class="w-[20px] h-[20px]" src="./verified.png" alt="Image when true">':""}
        </div>
        <p class="mx-[3rem] text-gray-500">${element.others.views} views</p>
        
        
      
    `
    cards.appendChild(card)
   });
  })
