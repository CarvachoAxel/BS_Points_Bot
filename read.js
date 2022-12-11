var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function createScores(data)
{
    var scores = new Map()
    var parsed = JSON.parse(data).record
    var guilds = Object.keys(parsed);

    for( var i = 0,length = guilds.length; i < length; i++ ) {
        let guild = parsed[ guilds[ i ] ]
        let rankings = Object.keys(guild)
        let guildId = guilds[i]
        scores.set(guildId, new Map())
        let scores_guild = scores.get(guildId)

        for( let j = 0,length = rankings.length; j < length; j++ ) {
            let ranking = guild[ rankings[ j ] ]
            let members = Object.keys(ranking)

            let rankingName = rankings[j]
            scores_guild.set(rankingName, new Map())
            let scores_ranking = scores_guild.get(rankingName)

            for( let k = 0,length = members.length; k < length; k++ ) {
                let score = ranking[members[k]]
                let memberId = members[k]
                scores_ranking.set(memberId, score)
            }
        }
    }
    return scores
}


module.exports = () => {

    let req = new XMLHttpRequest()

    req.open("GET", process.env.JSONBIN_URL + "/latest", false);
    req.setRequestHeader("X-Master-Key", process.env.JSONBIN_SECRET_KEY);
    req.send();

    return createScores(req.responseText)

}
