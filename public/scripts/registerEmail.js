
// FUNCTION FOR GENERATING A RANDOM ID
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
var id=guidGenerator();
var pid= document.getElementById("idConfirm");
pid.textContent=id;
pid.value=id;

