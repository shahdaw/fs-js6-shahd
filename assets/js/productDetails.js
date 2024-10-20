const getproducts =async ()=>{

    const params = new URLSearchParams(window.location.search);
    const id= params.get('id');
    console.log(id)
    const {data}= await axios.get(`https://dummyjson.com/products/${id}`);
    console.log(data);
    return data;
    
    }
    
    
    const displayproducts = async()=>{
    
        const product = await getproducts();
        
    
        const result = `
            <div class='product'>
            <img src="${product.thumbnail}" alt="${product.description}" />
            <h3>${product.title}</h3>
            <span>${product.price}</span>
            <p>${product.description}</p>
            <h4>${product.category}</h4>
             <span>${product.rating}</span>

            </div>
            `
  
            
            document.querySelector(".product-details .row").innerHTML = result;
    
    }
    
    displayproducts();