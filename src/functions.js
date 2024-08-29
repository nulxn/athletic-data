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
            school: racer.a.t.f,
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

function sortPRs(input) {
  let data = JSON.parse(input);

  data.prs.sort((a, b) => {
    const aSeconds = timeStringToSeconds(a.pr);
    const bSeconds = timeStringToSeconds(b.pr);
    return aSeconds - bSeconds;
  });

  var places = {};

  data.prs.forEach((item, arr) => {
    if (places[item.school]) {
      places[item.school].athletes++;
      if (places[item.school].athletes < 6) {
        let newArr = arr + 1;
        places[item.school].score += newArr;
      }
    } else {
      places[item.school] = { score: arr + 1, athletes: 1 };
    }
  });

  return JSON.stringify({ places: places, prs: data.prs }, null, 2);
}
