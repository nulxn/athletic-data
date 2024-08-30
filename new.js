(function () {
  var colores = {};
  colores[document.title] = [];
  var els = document.getElementsByClassName(
    "badge badge-sport me-1 mr-1 ng-star-inserted"
  );

  Array.prototype.forEach.call(els, function (el) {
    if (el.attributes.style) {
      colores[document.title].push(el.attributes.style.nodeValue);
    } else {
      console.log("No style attribute found");
    }
  });

  console.log(JSON.stringify(colores));
})();
