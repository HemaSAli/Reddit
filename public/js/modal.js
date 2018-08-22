
const showModel = name => {
  var modal = document.getElementById(name);
  var span1 = document.getElementsByClassName("close")[0];
var span2= document.getElementsByClassName("close")[1];
var span3= document.getElementsByClassName("close")[2];
var span4= document.getElementsByClassName("close")[3];
  modal.style.display = "block";
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  span1.onclick = function() {
    modal.style.display = "none";
  };
  span2.onclick = function() {
    modal.style.display = "none";
  };
  span3.onclick = function() {
    modal.style.display = "none";
  };
  span4.onclick = function() {
    modal.style.display = "none";
  };
};