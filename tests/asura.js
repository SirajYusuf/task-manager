const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require('fs')
const url = "https://www.asurascans.com/manga/?order=update";

async function scrapeData(){
    try{
        const {data} = await axios.get(url)
        const $ = cheerio.load(data)
    //     const listItems = $('div[class="listupd"]')
    // .find('div > div > a > div[class="bigor"]')
        const listItems = $(".listupd .bigor")
        console.log(listItems.length)
        const mangas = []
        listItems.each((idx,el)=>{
            const manga = {name: ''}
            manga.name = $(el).children("div[class=tt]").text();
            mangas.push(manga);
        })
        console.log(mangas)
    }catch(e){
        console.log(e)
    }
}

scrapeData()