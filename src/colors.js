function nameToColor(name) {
    var colors = {

    };
  
    let newName = name.toLowerCase();
  
    if (colors[newName]) {
      return colors[newName];
    } else {
      console.log("color name not found :( " + name);
    }
  }
