function inputDigitsOnly(e){
var chrTyped, chrCode=0, evt = e ? e : event;
if(evt.charCode!=null) chrCode = evt.charCode;
else if(evt.which!=null) chrCode = evt.which;
else if(evt.keyCode!=null) chrCode = evt.keyCode;
if(document.getElementById('msgerror') != null){
document.getElementById('msgerror').style.display = "none";
}
if(chrCode==0) chrTyped = 'SPECIAL KEY';
else chrTyped = String.fromCharCode(chrCode);
//[test only:] display chrTyped on the status bar
self.status='inputDigitsOnly: chrTyped = ' + chrTyped;
//Digits, special keys & backspace [\b] work as usual:
if(chrTyped.match(/\d|[\b]|SPECIAL/)) return true;
if(evt.altKey || evt.ctrlKey || chrCode<28) return true;
//Any other input? Prevent the default response:
document.getElementById('msgerror').style.display = "block";
document.getElementById('msgerror').style.height = "32px";
document.getElementById('msgerror').style.paddingTop = "4px";
document.getElementById('msgerror').style.paddingLeft = "9px";
document.getElementById('msgerror').style.width = "30%";
document.getElementById('msgerror').innerHTML = "Sólo se aceptan números";
if(evt.preventDefault) evt.preventDefault();
evt.returnValue = false;
return false;
}
function inputAlphanumericOnly(e){
var evt = e ? e : event;
var keyCode = (evt.which) ? evt.which : evt.keyCode;
document.getElementById('txterror').style.display = "none";
//alert("Código de tecla presionada " + keyCode);
if((keyCode<65 || keyCode>90) && (keyCode<97 || keyCode>122) && keyCode!=225 &&
keyCode!=193 && keyCode!=233 && keyCode!=201 && keyCode!=237 && keyCode!=205 && keyCode!=243
&& keyCode!=211 && keyCode!=250 && keyCode!=218 && keyCode!=241 && keyCode!=209 &&
keyCode!=252 && keyCode!=220 && keyCode!=161 && keyCode!=33 && keyCode!=191 && keyCode!=63
&& keyCode!=34 && keyCode!=46 && keyCode!=44 && keyCode!=59 && keyCode!=8 && keyCode!=13 &&
keyCode!=27 && keyCode!=32){
//Any other input? Prevent the default response:
document.getElementById('txterror').style.display = "block";
document.getElementById('txterror').style.height = "32px";
document.getElementById('txterror').style.paddingTop = "4px";
document.getElementById('txterror').style.paddingLeft = "9px";
document.getElementById('txterror').style.width = "40%";
document.getElementById('txterror').innerHTML = "Sólo se aceptan caracteres alfabéticos y signos gramaticales";
if(evt.preventDefault) evt.preventDefault();
evt.returnValue = false;
return false;
}
return true;
}
function addEventHandler(elem, eventType, handler) {
if(elem.addEventListener){
//alert("Evento " + eventType + " controlado en el elemento " + elem);
elem.addEventListener (eventType, handler, false);

}
else if(elem.attachEvent){
elem.attachEvent ('on' + eventType, handler);
}
else{
return 0;
}
return 1;
}
// onload: Call the init() function to add event handlers!
function init() {
addEventHandler(self.document.entradas.number, 'keypress', inputDigitsOnly);
addEventHandler(self.document.entradas.number, 'keypress',
inputAlphanumericOnly);
}
if(window.addEventListener){
window.addEventListener('load', init, false);
}
else if(window.attachEvent){
window.attachEvent('load', init);
}

