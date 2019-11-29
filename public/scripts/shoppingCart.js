// CHECKOUT PAGE - Total price
var prices= document.querySelectorAll("#price");
var total = document.getElementById("total");
var sum=0;
for(var i=0;i<=prices.length-1; i++){
    sum=sum+parseInt(prices[i].innerText,10);
}

total.textContent=sum.toString();

var reducere = document.getElementById("reducere");
reducere.textContent=sum-sum*10/100;