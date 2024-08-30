const json = require("./1498269.json");

const baseURL = "https://www.athletic.net/api/v1/";

async function fetchUserData(id, sport) {
  const response = await fetch(
    `${baseURL}AthleteBio/GetAthleteBioData?athleteId=${id}&sport=${sport}&level=16`
  );
  return response.json();
}

async function processRacers(meet) {
  var prs = [];

  const promises = meet._source.en.map(async (racer) => {
    if (typeof racer.a.ani !== "undefined") {
      const results = await fetchUserData(racer.a.ani, "tf");
      const res = results.json();
      res.resultsTF.forEach((race) => {
        if (race.EventID == 60 && race.PersonalBest == 14) {
          prs.push({
            name: racer.a.n,
            pr: race.Result,
            school: { name: racer.a.t.f, id: racer.a.t.ani },
          });
        }
      });
    }
  });

  await Promise.all(promises);

  return JSON.stringify({ prs: prs }, null, 2);
}

function timeStringToSeconds(timeStr) {
  const cleanTimeStr = timeStr.replace(/[^\d.:]/g, "");

  const [minutes, seconds] = cleanTimeStr.split(":");
  const [secs, millis] = seconds.split(".");

  const totalSeconds =
    parseInt(minutes) * 60 +
    parseInt(secs) +
    (millis ? parseFloat("0." + millis) : 0);
  return totalSeconds;
}

async function sortPRs(input) {
  let data = JSON.parse(input);

  data.prs.sort((a, b) => {
    const aSeconds = timeStringToSeconds(a.pr);
    const bSeconds = timeStringToSeconds(b.pr);
    return aSeconds - bSeconds;
  });

  var places = {};

  for (const [index, item] of data.prs.entries()) {
    var escuela = item.school.name;

    if (places[escuela]) {
      places[escuela].athletes++;
      if (places[escuela].athletes < 6) {
        places[escuela].score += index + 1;
      }
    } else {
      var colores = await fetch(
        `https://www.athletic.net/api/v1/TeamNav/Team?team=${item.school.id}&sport=xc&season=2024`
      );
      var colors = colores.json().team.colors;
      places[escuela] = { score: index + 1, athletes: 1, colors: colors };
    }
  }

  return JSON.stringify({ places: places, prs: data.prs }, null, 2);
}

async function uwu() {
  const prs = await processRacers(json);
  const sortedResults = await sortPRs(prs);
  var parsed = JSON.parse(sortedResults);

  var validEntries = {};
  Object.entries(parsed.places).forEach((item) => {
    if (item[1].athletes >= 5) validEntries[item[0]] = item[1];
  });

  let sortable = Object.entries(validEntries);
  sortable.sort((a, b) => {
    return a[1].score - b[1].score;
  });

  var _res = {};
  _res.teams = sortable;
  _res.athletes = parsed.prs;

  var graphData = [];
  _res.teams.forEach((team) => {
    var boiler = {
      team: team[0],
      score: team[1].score,
      colors: team[1].colors,
    };
    graphData.push(boiler);
  });

  console.log(graphData);
}

uwu();
