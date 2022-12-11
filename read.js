var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function printData(name, data) {
    console.log(`### begin ${name}`);
    console.log(data);
    console.log(`### end ${name}`);
}

function createScores(data)
{
    var scores = new Map()

    printData("data", data)
    var parsed = JSON.parse(data).record
    printData("parsed", parsed)

    var guilds = Object.keys(parsed);
    printData("guilds", guilds)

    for( var i = 0,length = guilds.length; i < length; i++ ) {
        let guild = parsed[ guilds[ i ] ]
        let rankings = Object.keys(guild)
        printData("rankings", rankings)

        let guildId = guilds[i]
        printData("guildId", guildId)
        scores.set(guildId, new Map())
        let scores_guild = scores.get(guildId)
        printData("scores_guild", scores_guild)

        for( let j = 0,length = rankings.length; j < length; j++ ) {
            let ranking = guild[ rankings[ j ] ]
            let members = Object.keys(ranking)
            printData("members", members)

            let rankingName = rankings[j]
            printData("rankingName", rankingName)
            scores_guild.set(rankingName, new Map())
            let scores_ranking = scores_guild.get(rankingName)
            printData("scores_ranking", scores_ranking)

            for( let k = 0,length = members.length; k < length; k++ ) {
                let score = ranking[members[k]]
                let memberId = members[k]
                printData("score", score)
                printData("memberId", memberId)
                scores_ranking.set(memberId, score)
                console.log(`Después de: scores_ranking.set con j = ${k}`)
            }
            console.log(`En for con j = ${j}`)
        }
    }
    return scores
}


module.exports = () => {

    let req = new XMLHttpRequest()

    req.open("GET", process.env.JSONBIN_URL + "/latest", false);
    req.setRequestHeader("X-Master-Key", process.env.JSONBIN_SECRET_KEY);
    req.send();

    // console.log("req.responseText " + req.responseText)
    return createScores(req.responseText)

}
