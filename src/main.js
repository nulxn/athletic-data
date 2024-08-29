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
