function nameToColor(name, tem) {
  var colors = {
    Burgundy: "rgb(119, 11, 11",
    Navy: "rgb(27, 22, 64",
    "Forest Green": "rgb(15, 69, 9",
    "Vegas Gold": "rgb(185, 163, 106",
    Teal: "rgb(0, 112, 128",
    Orange: "rgb(251, 106, 0",
    Cardinal: "rgb(119, 11, 12",
    Red: "rgb(206, 5, 5",
    Black: "rgb(24, 23, 23",
    "Hunter Green": "rgb(15, 69, 9",
    Purple: "rgb(74, 12, 118",
    Gold: "rgb(255, 179, 0",
    Gray: "rgb(129, 133, 137",
  };
  let newName = name;

  if (colors[newName]) {
    console.log(tem + ": " + newName);
    return colors[newName];
  } else {
    console.log("color name not found :( " + name);
  }
}
