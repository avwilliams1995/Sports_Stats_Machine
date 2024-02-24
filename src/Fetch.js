let result;

const fetchData = async (type, name, stat, date, statType, cache = {}) => {
  let level = type.split(" ")[0];
  let item = type.split(" ")[1];

  console.log("------------------ in fetch", name, stat, date, level);
  const levelObj = {
    NCAA: "930",
    NBA: "766",
  };

  const API_KEY =
    "b7a22a8a82c5effbfaf2aef4c1642cff905c8e0c4677860853d41512abaff014";
  const url =
    date !== "live"
      ? `https://apiv2.allsportsapi.com/basketball/?met=Fixtures&leagueId=${levelObj[level]}&APIkey=${API_KEY}&from=${date}&to=${date}`
      : `https://apiv2.allsportsapi.com/basketball/?met=Livescore&leagueId=${levelObj[level]}&APIkey=${API_KEY}`;
  // if (cache[name][statType]) return cache[name][statType];
  // if (cache[name][date]) return cache[name][date]
  let found = false;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // cache[name] = {}
      if (item === "Player") {
        for (let game of data.result) {
          for (let player of game.player_statistics.away_team) {
            if (player.player === name) {
              found = true;
              // cache[name][statType] = player[stat]
              result = player[stat];
            }
          }
          for (let player of game.player_statistics.home_team) {
            if (player.player === name) {
              found = true;
              // cache[name][statType] = player[stat]
              result = player[stat];
            }
          }
        }
      } else if (item === "Game") {
        for (let game of data.result) {
          if (game.event_home_team === name) {
            found = true;
            // cache[name][date] = game.event_final_result
            result = game.event_final_result;
          } else if (game.event_away_team === name) {
            found = true;
            let arr = game.event_final_result.split(" - ");
            result = `${arr[1]} - ${arr[0]}`;
            // cache[name][date] = result
          }
        }
      }
    });
  console.log(cache);
  return !found ? "Could not find" : result;
};

export default fetchData;
