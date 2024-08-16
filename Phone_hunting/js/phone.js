const loadPhone = async (searchText,isShowAll) =>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data= await res.json();
    const phone=data.data;
    // console.log(phone);
    displayPhones(phone,isShowAll);
}


const searchHandaler =(isShowAll) =>{
    const search=document.getElementById("text-area");
    const searchText=search.value;
    toggleLoadingBars(true);
    // search.value='';
    // console.log(searchText);
    loadPhone(searchText,isShowAll);
}



const toggleLoadingBars = (isLoading) =>{
    const loadingBars=document.getElementById('loading-bars');
        if(isLoading){
            loadingBars.classList.remove('hidden');
        }
        else{
            loadingBars.classList.add('hidden');
        }
}


const  HandleloadMore = () => {
    // console.log('true')
    searchHandaler(true);
}


const displayPhones = (phones,isShowAll) =>{

    const container=document.getElementById('phone-container');
    container.textContent='';
    const loadmore=document.getElementById('loadMore')
    if(phones.length>12 && !isShowAll){
        loadmore.classList.remove('hidden');
    }
    else{
        loadmore.classList.add('hidden');
    }
    // console.log("isShowAll",isShowAll);
    if(!isShowAll){
        phones= phones.slice(0,12);
    }
    // console.log(phones)
    phones.forEach(phone =>{
        // console.log(phone)

    const phoneCard=document.createElement('div');
    phoneCard.classList=`card bg-gray-100 p-4 shadow-xl`
    phoneCard.innerHTML=`<figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>${phone.slug}</p>
                      <div class="card-actions justify-center mt-5">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>`
                    container.appendChild(phoneCard);
    });

        toggleLoadingBars(false);    
}


const handleShowDetail = async (id) =>{
    // console.log('clicked show details',id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data= await res.json();
    const phone=data.data;
    // console.log(phone)
    showPhoneDetails(phone)
}


const showPhoneDetails= (phone) =>{
    console.log(phone)

    const phoneName=document.getElementById('show-detail-phone-name');
    phoneName.innerText=phone.name;

    const showDetailContainer=document.getElementById('show-detail-container');
    showDetailContainer.innerHTML=`
    <div class="w-full"><img class="mx-auto my-7 h-80 w-60" src="${phone.image}" alt=""/></div>
    <p><span class="font-bold leading-loose">Storage : </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="grid justify-items-start font-bold leading-loose">Display size : </span>${phone?.mainFeatures?.displaySize
}</P>
    <p><span class="font-bold leading-loose">Chipset : </span>${phone?.mainFeatures?.chipSet
}</P>
    <p><span class="font-bold leading-loose grid justify-items-start">Memory : </span>${phone?.mainFeatures?.memory
}</P>
    <p><span class="font-bold leading-loose">Slug : </span>${phone?.slug
}</P>
    <p><span class="font-bold leading-loose">Release Date : </span>${phone?.releaseDate
}</P>
    <p><span class="font-bold leading-loose">Brand : </span>${phone?.brand
}</P>
    <p><span class="font-bold leading-loose">GPS : </span>${phone?.others?.GPS ||'No GPS'
}</P>
    `
    show_details_modal.showModal();
}




const loadPhones=async()=>{
    const res= await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data=await res.json();
    const phones=data.data
    // console.log(phones)
    anotherdisplayPhones(phones);
}
 
loadPhones();


const anotherdisplayPhones = phones =>{
    const anotherPhoneContainer=document.getElementById('another-phone-container');
  phones= phones.slice(0,9);
  phones.forEach(phone=>{
      const phoneCard=document.createElement('div');
      phoneCard.classList=`card bg-gray-100 p-4 shadow-xl`
          phoneCard.innerHTML=`<figure>
          <img
                src="${phone.image}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
              <p>${phone.slug}</p>
              <div class="card-actions justify-center mt-5">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>`
            anotherPhoneContainer.appendChild(phoneCard);
    })
}

document.getElementById('search').addEventListener('click', function() {
    var content = document.getElementById('another-phone-container');
    if (content.classList.contains('hidden')) {
        
    } 
    else {
        content.classList.add('hidden');
    }
});