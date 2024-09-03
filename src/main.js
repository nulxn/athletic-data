console.clear();

async function beginzecode() {
  console.log("code haz begun");
  try {
    const response = await axios.get(
      `https://athleticlive.blob.core.windows.net/$web/ind_ent_list/_doc/${
        document.getElementById("meetinput").value
      }`
    );
    const json = response.data;

    if (typeof json._source.en !== "undefined") {
      const prs = await processRacers(
        json,
        Number(document.getElementById("events").value)
      );
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

      new Chart(document.getElementById("teamScores"), {
        type: "bar",
        data: {
          labels: graphData.map((row) => row.team),
          datasets: [
            {
              label: "Team Scores",
              data: graphData.map((row) => row.score),
              backgroundColor: graphData.map(
                (row) => `${nameToColor(row.colors[0], row.team)}, 0.9)`
              ),
              borderColor: graphData.map((row) => {
                if (
                  row.colors.length === 2 ||
                  row.colors.includes(null) ||
                  row.colors.includes("null")
                )
                  return `${nameToColor(row.colors[1], row.team)}, 0.95)`;
                else {
                  return `${nameToColor(row.colors[2], row.team)}, 1)`;
                }
              }),
              borderWidth: 4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#f8f8f2",
                font: {
                  size: 14,
                  family: "Arial, sans-serif",
                },
              },
            },
            tooltip: {
              backgroundColor: "#44475a",
              titleColor: "#f8f8f2",
              bodyColor: "#f8f8f2",
              borderColor: "#bd93f9",
              borderWidth: 2,
              padding: 10,
              caretSize: 6,
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#f8f8f2",
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "#44475a",
                borderColor: "#282a36",
                borderWidth: 1,
              },
            },
            y: {
              ticks: {
                color: "#f8f8f2",
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "#44475a",
                borderColor: "#282a36",
                borderWidth: 1,
              },
            },
          },
          elements: {
            point: {
              radius: 4,
              backgroundColor: "#bd93f9",
              borderColor: "#f8f8f2",
              borderWidth: 1,
            },
            line: {
              borderColor: "#bd93f9",
              borderWidth: 2,
            },
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            },
          },
          backgroundColor: "#282a36",
        },
      });

      var tableData = [];
      _res.athletes.forEach((pers) => {
        var boiler = {
          name: pers.name,
          pr: pers.pr,
          school: pers.school.name,
        };
        tableData.push(boiler);
      });
      var table = new Tabulator("#example-table", {
        data: tableData,
        autoColumns: true,
        pagination: "local",
        paginationSize: 10,
        paginationSizeSelector: [10, 20, 30],
        movableColumns: true,
        layout: "fitColumns",
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
