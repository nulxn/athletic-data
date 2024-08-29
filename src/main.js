console.clear();

async function beginzecode() {
  try {
    const response = await axios.get(
      `https://athleticlive.blob.core.windows.net/$web/ind_ent_list/_doc/${
        document.getElementById("meetinput").value
      }`
    );
    const json = response.data;

    if (typeof json._source.en !== "undefined") {
      const prs = await processRacers(json);
      const sortedResults = sortPRs(prs);
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
        var boiler = { team: team[0], score: team[1].score };
        graphData.push(boiler);
      });

      new Chart(document.getElementById("teamScores"), {
        type: "bar",
        data: {
          labels: graphData.map((row) => row.team),
          datasets: [
            {
              label: "Team Scores",
              data: graphData.map((row) => row.score),
            },
          ],
        },
      });

      var table = new Tabulator("#example-table", {
        data: _res.athletes,
        autoColumns: true,
      });

      console.log(_res);
    } else if (typeof json._source.r !== "undefined") {
      console.log("this meet already happened!");
    } else {
      console.log("the entries for this meet have not been posted");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
