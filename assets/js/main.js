const getcategories = async () => {

const {data} = await axios.get(`https://dummyjson.com/products/category-list`);

return data;

}

const displaycategories = async()=>{
    const loader= document.querySelector(".loader-container");
    loader.classList.add("active");
    try{
const categories = await getcategories();

const result = categories.map( (category)=>{
    return `<div class='category'>
    <h2>${category}</h2>
    <a href='categoryDetails.html?category=${category}'>Details</a>
    </div>`
    } ).join('');
    
    document.querySelector(".categories .row").innerHTML = result;
}

catch(error){
    document.querySelector(".categories .row").innerHTML ="<p>error loading categories</p>";
}

finally{
loader.classList.remove("active");
}

}

const getproducts = async(page)=> {

    const skip = (page - 1) * 20;

    const {data} = await axios.get(`https://dummyjson.com/products?limit=20&skip=${skip}`);

    return data;
}

const displayproducts = async(page = 1)=>{
    const loader= document.querySelector(".loader-container");
    loader.classList.add("active");
    try{
    const data = await getproducts(page);
    const numberOfpages = Math.ceil(data.total / 20);

    const result = data.products.map( (product)=>{
        return `
        <div class='product'>
        <img src="${product.thumbnail}" alt="${product.description}" />
        <h3>${product.title}</h3>
        <span>${product.price}</span>
        </br>
        <a href='productDetails.html?id=${product.id}'>Details</a>
        </div>
        `
        } ).join('');
        document.querySelector(".products .row").innerHTML = result;
        let paginationLinks = ``

        if(page == 1){
            paginationLinks+=`<li class="page-item"><button class="page-link" disabled>&laquo;</button></li>`;
        }
        else{
            paginationLinks+=`<li class="page-item"><button onclick=displayproducts('${page-1}') class="page-link">&laquo;</button></li>`; 
        }

        for(let i=1;i<=numberOfpages;i++){
            paginationLinks+=`<li class="page-item ${i == page?'active':''}"><button onclick=displayproducts('${i}') class="page-link">${i}</button></li>`; 
        }

        if(page == numberOfpages){
            paginationLinks+=`<li class="page-item"><button disabled class="page-link">&raquo;</button></li>`; 
        }
        else{
            paginationLinks+=`<li class="page-item"><button onclick=displayproducts('${parseInt(page)+1}') class="page-link" >&raquo;</button></li>`; 
        }

        console.log(paginationLinks);

        document.querySelector(".pagination").innerHTML = paginationLinks;
}

catch(error){
    document.querySelector(".products .row").innerHTML ="<p>error loading products</p>";
}

finally{

    loader.classList.remove("active");

}

}

displaycategories();
displayproducts();


























