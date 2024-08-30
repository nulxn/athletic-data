const baseURL = "https://www.athletic.net/api/v1/";

async function fetchUserData(id, sport) {
  const response = await axios.get(
    `${baseURL}AthleteBio/GetAthleteBioData?athleteId=${id}&sport=${sport}&level=16`
  );
  return response;
}

async function processRacers(meet) {
  var prs = [];

  const promises = meet._source.en.map(async (racer) => {
    if (typeof racer.a.ani !== "undefined") {
      const results = await fetchUserData(racer.a.ani, "tf");
      const res = results.data;
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
      var colores = await axios.get(
        `https://www.athletic.net/api/v1/TeamNav/Team?team=${item.school.id}&sport=xc&season=2024`
      );
      var colors = colores.data.team.colors;
      places[escuela] = { score: index + 1, athletes: 1, colors: colors };
    }
  }

  return JSON.stringify({ places: places, prs: data.prs }, null, 2);
}
