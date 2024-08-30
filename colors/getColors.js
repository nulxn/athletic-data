var meet = require("./1498269.json");
var teamColors = require("./tests.json");
var teamIds = require("./teamsId.json");
const axios = require("axios");

/**
var athletes = meet._source.en;
var teams = {};
athletes.forEach((item) => {
  var athlete = item.a;
  var team = athlete.t;
  if (!teams[team.n]) teams[team.n] = team.ani;
});

console.log(JSON.stringify(teams));
*/

var _colores = {};
Object.entries(teamIds).forEach((team) => {
  var teamName = team[0];
  var teamId = team[1];
  //console.log("teamname: " + teamName);
  //console.log("teamid: " + teamId);

  axios
    .get(
      `https://www.athletic.net/api/v1/TeamNav/Team?team=${teamId}&sport=xc&season=2024`
    )
    .then((res) => {
      var response = res.data;
      var colors = response.team.colors;
      colors.forEach((item, arr) => {
        var skibid = teamColors[teamName];
        if (skibid) {
          var ne;
          if (arr == 0) ne = 1;
          if (arr == 1) ne = 0;
          _colores[item] = skibid[ne];
        }
      });

      console.log(JSON.stringify(_colores));
      console.log("----");
    })
    .catch((err) => console.error("error:" + err));
});
