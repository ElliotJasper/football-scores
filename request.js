const date = require("./getdate");
const fetch = require("node-fetch");

let formatDateAPI = date.formatDateAPI;
let formatDatePath = date.formatDatePath;

console.log(formatDateAPI);
console.log(formatDatePath);
let requestURL = `https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-football-scores-match-list-data%2FendDate%2F${formatDateAPI}%2FstartDate%2F${formatDateAPI}%2FtodayDate%2F${formatDateAPI}%2Ftournament%2Ffull-priority-order%2Fversion%2F2.4.6?timeout=5`;

// Fetch Data
fetch(requestURL)
  .then((res) => res.json())
  .then((data) => {
    let allScores = [];
    let allTeam = [];
    let leagueRoute = data.payload[0].body.matchData;

    // Loop through object to find (a specific league) games only
    for (i = 0; i < leagueRoute.length; i++) {
      if (leagueRoute[i].tournamentMeta.tournamentSlug == "world-cup") {
        let leagueRouteLocal = leagueRoute[i];
        let scorePath = leagueRouteLocal.tournamentDatesWithEvents[formatDatePath];
        scorePath = scorePath[0].events; //Different for world cup, not just [0], different number for each
        
        // Loop through the events to get info of all games
        // Store in objects
        // Push to array which will be used to add to database
        for (i = 0; i < scorePath.length; i++) {
          let game = {
            date: formatDateAPI,
            league: leagueRouteLocal.tournamentMeta.tournamentSlug,
            homeName: scorePath[i].homeTeam.name.first,
            homeScore: scorePath[i].homeTeam.scores.score,
            awayName: scorePath[i].awayTeam.name.first,
            awayScore: scorePath[i].awayTeam.scores.score,
            startTime: scorePath[i].startTimeInUKHHMM,
          };
  
          let homeTeam = {
            date: date.formatDateAPI,
            name: scorePath[i].homeTeam.name.first,
            result: scorePath[i].homeTeam.eventOutcome,
            league: leagueRouteLocal.tournamentMeta.tournamentSlug,
          };
          let awayTeam = {
            date: date.formatDateAPI,
            name: scorePath[i].awayTeam.name.first,
            result: scorePath[i].awayTeam.eventOutcome,
            league: leagueRouteLocal.tournamentMeta.tournamentSlug,
          };
          
          // Export arrays
          allTeam.push(homeTeam, awayTeam);
          console.log(game);
          allScores.push(game);
          module.exports.allScores = allScores;
          module.exports.game = game;
          module.exports.allTeam = allTeam;
        };
      } 
    }



    
    

    // If premier league games found, append the game object to an array

  });

// INFINTIE LOOP NEEDS FIXING ON LEAGUE 2 PART!!!