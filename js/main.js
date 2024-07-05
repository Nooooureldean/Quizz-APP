

var productNameInput = document.getElementById('ProductNameInput')
var productPriceInput = document.getElementById('productPriceInput')
var productcategoryInput = document.getElementById('productCategoryInput')
var productDescInput = document.getElementById('productDescInput')

function clearform() {
        productNameInput.value=""
        productPriceInput.value=""
        productcategoryInput.value=""
        productDescInput.value=""

}


function DisplayInTable() {
    var cartoona=``;
    for (var i = 0; i < ProductContainer.length; i++) {
        cartoona += `<tr>
        <td>${i}</td>
        <td>${ProductContainer[i].name}</td>
        <td>${ProductContainer[i].price}</td>
        <td>${ProductContainer[i].category}</td>
        <td>${ProductContainer[i].description}</td>
        <td><button onclick="updateitem(${i})" class="btn btn-outline-warning">update</button></td>
        <td><button onclick="deleteproduct(${i})" class="btn btn-outline-danger">delete</button></td>

    </tr>`;
    }
    document.getElementById('TableBody').innerHTML = cartoona;
}



var ProductContainer=[];

if(localStorage.getItem('product')!= null) {
    ProductContainer=JSON.parse(localStorage.getItem('product'));
    DisplayInTable();
}
function Addproduct() {
    var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productcategoryInput.value,
        description:productDescInput.value
    }
    ProductContainer.push(product);

    localStorage.setItem('product' , JSON.stringify(ProductContainer));

    DisplayInTable();
    clearform();
    console.log(ProductContainer);
}
function deleteproduct(productindex) {
    ProductContainer.splice(productindex,1);
    localStorage.setItem('product' , JSON.stringify(ProductContainer));

    DisplayInTable();

}



// function deleteproduct(productindex) {
//     ProductContainer.splice(productindex,1);
//     localStorage.setItem('product' , JSON.stringify(ProductContainer));

//     DisplayInTable();

// }

function searchproduct(searchitem) {
    var not_fond="not found";
    var cartoona=``;

    for (var i = 0; i < ProductContainer.length; i++) {
        if (ProductContainer[i].name.toLowerCase().includes(searchitem.toLowerCase()) == true) {
            cartoona += `<tr>
            <td>${i}</td>
            <td>${ProductContainer[i].name}</td>
            <td>${ProductContainer[i].price}</td>
            <td>${ProductContainer[i].category}</td>
            <td>${ProductContainer[i].description}</td>
            <td><button  class="btn btn-outline-warning">update</button></td>
            <td><button  class="btn btn-outline-danger">delete</button></td>
            </tr>`;
        }
        else{
            document.getElementById(searchinput).innerHTML=not_fond;
        }
        
    }
    document.getElementById('TableBody').innerHTML = cartoona;

}

function updateitem(indexitem) {
    productNameInput.value=ProductContainer[indexitem].name;
    productPriceInput.value=ProductContainer[indexitem].price;
    productcategoryInput.value=ProductContainer[indexitem].category;
    productDescInput.value=ProductContainer[indexitem].description;
    
}
