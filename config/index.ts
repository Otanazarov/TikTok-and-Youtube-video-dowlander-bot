import { Bot, Context, InlineKeyboard, InputFile } from 'grammy';
import fetch from 'node-fetch';
import ytdl from 'ytdl-core'; // namespace stili importni o'rniga * as bilan import qiling
import { env } from './env-config';
import { Menu } from '@grammyjs/menu';
import * as fs from 'fs'
import { dirname } from 'path';
const axios = require('axios');


const bot = new Bot(env.BOTTOKEN) 
async function downloadTikTokVideo(url: string) {
  try {
    const response = await axios.get(url)
    console.log(response.data);
    ;
    const videoUrlMatch = response.data.match(/"videoplayback":"([^"]+)"/);
    
    if (!videoUrlMatch) {
      throw new Error('Video URL topilmadi');
    }
    const videoUrl = videoUrlMatch[1];
    

    // Video yuklab olish
    const videoResponse = await axios.get(videoUrl, { responseType: 'stream' });
    const videoWriteStream = videoResponse.data.pipe(fs.createWriteStream(__dirname + '/video.mp4'));

    return new Promise<void>((resolve, reject) => {
      videoWriteStream.on('finish', () => {
        resolve();
      });

      videoWriteStream.on('error', (error: Error) => {
        reject(error);
      });
    });
  } catch (error: any) {
    throw new Error('Video yuklashda xatolik yuz berdi');
  }
}

bot.on('::url', async (ctx) => {
  const messageText = ctx.message?.text;
  if (messageText && messageText.includes('tiktok.com')) {
    const url: string = messageText.trim();
    try {
      await ctx.reply('Video yuklanmoqda...');
      console.log('llll');
      await downloadTikTokVideo(url);
      const file = new InputFile(__dirname + '/video.mp4');
      await ctx.replyWithVideo(file);
    } catch (error:any) {
      console.log(error.message);
    }
  }
});

// const inlineKeyboard = new InlineKeyboard()
//   .text("« 1", "first")
const inlineKeyboard = new InlineKeyboard()
.text("Youtube","Youtube").text("Xiva","xiva")

const menu = new Menu("movements")
  .text("Iblislar qotili", (ctx) => ctx.reply("Forward!")).row()
  .text("Sehrli jang", (ctx) => ctx.reply("Left!")).row()
  .text("Elita sinf", (ctx) => ctx.reply("Right!")).row()
  .text("Arra Odam", (ctx) => ctx.reply("Backwards!"));

  bot.use(menu)


bot.start()

bot.command('start', async (ctx) => {
  // const keyboard = {
  //   keyboard: [
  //     ['Namoz vaqtlari☪️'],
  //     ['Ob-havo⛅️'],
  //   ],
  //   resize_keyboard: true,
  // };

  await ctx.reply(`Salom! Botga xush kelibsiz!
Siz to'g'ridan to'g'ri Youtube va TikTok Url manzilini yuborishingiz mumkin `, {
  });
});
  


//   bot.hears("Namoz vaqtlari☪️",async (ctx)=>{
//     const req = await fetch("https://islomapi.uz/api/present/day?region=Urganch")
//     const res = await req.json()
//     ctx.reply(res)
//     console.log(res.region);
//   })
//   bot.hears("Ob-havo⛅️",async (ctx)=>{
//     const req = await fetch("https://api.api-ninjas.com/v1/weather?city=xiva",{headers:{'X-Api-KEY':env.NINJA_API_KEY}})
//     const res = await req.json()
    
//     ctx.reply(`Temp☁️ ${res.temp}
// Cloud_pct🌬️ ${res.cloud_pct}
// wind_speed🌪️ ${res.wind_speed}`)
//   })

//   bot.hears("Anime",async (ctx)=>{
//     await ctx.reply('Anime ni tanlang',{reply_markup:menu})
//     await ctx.replyWithPhoto(new InputFile("./HD-wallpaper-anime-jujutsu-kaisen-satoru-gojo.jpg"));
//   })





 bot.on("::url",async(ctx)=>{
  if(ctx.message?.text){
    const url:string =ctx.message?.text
    const video = ytdl(url)
    const videoWriteStrem = video.pipe(fs.createWriteStream(__dirname+'/video.mp4'))
    console.log("sdfsfs");
  videoWriteStrem.on('close',async()=>{
    await ctx.reply("Dowlanding")
    const file = new InputFile(__dirname+'/video.mp4')
    await ctx.replyWithVideo(file)
  })
  }
})
import { TiktokDL } from "@tobyg74/tiktok-api-dl"
import { text } from 'stream/consumers';


const tiktok_url = "https://vt.tiktok.com/ZS84BnrU9"

TiktokDL(tiktok_url).then((result) => {
  console.log(result)
})
  
  







