var modeBtn = document.querySelectorAll(".mode");
var ctgName = document.getElementById("ctgName");
var hdName= document.querySelectorAll(".hdName");
var text2= ctgName.textContent || ctgName.innerText;
var l=hdName.length;
// function for selecting the SELECTED Category
for (var i = 0; i < l; i++)
{
    var text1= hdName[i].textContent || hdName[i].innerText;
    if (text1 === text2)
    {
         hdName[i].classList.add("selected");
    }
}
