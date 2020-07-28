var getRanking = require('./getRanking')

module.exports = (message,scores) => {
  rankingName = message.content.split(" ")[1]
  if (rankingName == undefined)
    return "ranking undefined"

  rankings = scores.get(message.guild.id)
  if (rankings == undefined)
    return "Error! No ranking on this server.\nTry: b!create <ranking-name>"

  ranking = rankings.get(rankingName)
  if (ranking==undefined)
    return "Error! The ranking " + rankingName + " doesn't exist on this server.\nTry: b!ranking <ranking-name>"

  answer = getRanking(ranking)
  message.channel.send({embed: {
      title: rankingName,
      description: answer
    }})
  // return "here's the leaderboard you've asked for:\n\n**" + rankingName+ "**:\n\n" + getRanking(ranking);
}
