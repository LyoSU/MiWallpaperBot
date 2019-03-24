const Telegraf = require('telegraf')
const {
  miWallpaper,
} = require('./utils')


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username
})

bot.start((ctx) => ctx.replyWithHTML('Привет я выдаю обои из Mi Wallpaper Carousel\n\n<b>Список категорий:</b> /category\n<b>Случайные обои:</b> /mi\n\nРазработчик: @LyoSU'))

bot.hears(/(?:\/mi)((?:_|)(\w+)|)/, async (ctx) => {
  ctx.replyWithChatAction('upload_photo')

  const lock = await miWallpaper.lock(ctx.match[2], ctx.from.id)

  ctx.replyWithPhoto({
    url: lock,
    filename: 'image.png',
  }, {
    reply_to_message_id: ctx.message.message_id,
  })
})

bot.command('category', async (ctx) => {
  const { categorys } = miWallpaper
  let categoryList = ''

  Object.keys(categorys).forEach((category) => {
    categoryList += `\n${categorys[category].name} - /mi_${category}`
  })

  ctx.replyWithHTML(`<b>Категории:</b>${categoryList}`)
})

bot.command('quit', (ctx) => {
  ctx.leaveChat()
})


bot.launch()
