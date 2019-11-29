

// COPY BUTTON FUNCTION

var link=document.getElementById("link");
link.value = window.location.href || document.URL;

function myFunction() {
  var link = document.getElementById("link");
  link.select();
  document.execCommand("copy");
  var copy=document.getElementById("copy");
  copy.textContent="Copied";
}

// WISHLIST & SHOPPING CART FUNCTIONS

var wishlist= document.getElementById("icoWish");
var buyCart= document.getElementById("icoBuy");
var check=document.getElementById("check");
wishlist.addEventListener("click", function () {
  if (wishlist.style.backgroundColor == "transparent")
  {
      wishlist.style.backgroundColor="white";
      check.textContent="..";
  }
  else {
    wishlist.style.backgroundColor="transparent";
    check.textContent=".";
  }
});


// CONVERTOR FUNCTION
/*
  var selector = document.getElementById("convert");
var price = parseInt(document.getElementById("price").innerText, 10);
var currentV = selector.value;
var price2 = document.getElementById("price");
selector.addEventListener("change", function () {
  var otherV = this.value;
  Router.convertor.convertCurrency(price, currentV, otherV, function (err, amount) {
    price2.textContent = ammount.toString();
  });
}); 
*/

// AVARGE RATING 

var avg = document.getElementById("avarage");
var rates= document.querySelectorAll("#rate");
var sum2=0;
if(rates.length>0)
{

  for(var l=0;l<= rates.length-1; l++)
  {
    sum2=sum2+parseInt(rates[l].innerText,10);
  }
  var text = (sum2 / l).toFixed(2).toString() + " average";
  avg.textContent=text;
}
else {

  avg.textContent = "No Ratings Yet";
}