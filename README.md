# athletic-data

![GitHub Repo stars](https://img.shields.io/github/stars/nulxn/athletic-data?style=for-the-badge&labelColor=%2344475a&color=%23bd93f9)
![GitHub License](https://img.shields.io/github/license/nulxn/athletic-data?style=for-the-badge&labelColor=%2344475a&color=%23ff5555)
![GitHub top language](https://img.shields.io/github/languages/top/nulxn/athletic-data?style=for-the-badge&labelColor=%2344475a&color=%2350fa7b)

**Simulates `athletic.net` race results and placing based on PRs**

## Usage

Go to any event for a meet (with entries posted) on `live.athletic.net` and copy the last string of numbers (e.g. ...net/meets/39520/events/xc/**1497096**). Then put the meet ID in the input box, choose an event to base the PRs off of, and press submit.

> **Note:** It will take some time depending on the size of the event to display the simulated data.

## How it works

Athletic-data will fetch all the registered athletes for the event, and then will fetch each athlete's PRs based on their Athletic.net account.

> **Note:** This means that athletes that don't have both their TF and XC profiles claimed through the same account will not be shown in the simulated data set. (This is only really a limitation for new `(freshmen/novice)` athletes and `slower` athletes)

Athletic-data will then sort through each team and assign them a score based on their athletes' placing. The points will be displayed with a chart `(Chart.js)` and the PRs in a table `(Tabulator)`.

### Directories

- `/src/` The website, dependencies, and scripts. Basically the whole project
- `/colors/` A node.js program I made to pull the colors of schools in order to map athletic.net team color names to rgb color codes. **This doesn't need to be ran and is unrelated to the website.** Will be removed at a later date.
- `/dist/` The website minimized with `gulp`. Where the project is hosted on the web.

### Dependencies

- [Axios](https://github.com/axios/axios)
- [Chart.js](https://github.com/chartjs/Chart.js)
- [Tabulator](https://github.com/olifolkerd/tabulator)

**Building:**

- Install [Gulp]() with `npm i`
- Run `npx gulp`
- Paste the font file from `src` to `dist/fonts` because gulp breaks the font file (to be fixed)

> Uses [**Dracula**](https://github.com/dracula/dracula-theme) color palette
