require('dotenv').config()
var read = require('./read')
var readRankingLinks = require('./data_persistency/readRankingLinks')
var readTitles = require('./data_persistency/readTitles')
const data_file = './db/scores_data.json'
const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const User = require('./model/User.js')

client.login(process.env.BOT_TOKEN)

function printData(name, data) {
  console.log(`### begin ${name}`);
  console.log(data);
  console.log(`### end ${name}`);
}

console.log("#####\nEn index.js\n#####")

var scores = read();
printData("scores", scores)

var rankings_links = readRankingLinks();
printData("rankings_links", rankings_links)

var rankings_titles = readTitles();
printData("rankings_titles", rankings_titles)

// var scores = new Map()
// var rankings_titles = new Map()
// var rankings_links = new Map();

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, (...args) => eventHandler(client, scores, rankings_links, rankings_titles, ...args));
  })
})



require('http').createServer().listen(2091)
