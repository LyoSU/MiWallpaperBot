const axios = require('axios')


const apiUri = 'http://wallpaper.pandora.xiaomi.com/api/a2/'


const categorys = {
  illustration: {
    id: 'CC01000017',
    name: 'Иллюстрации',
  },
  animation: {
    id: 'CC01000017',
    name: 'Анимация',
  },
  art: {
    id: 'CC00000001',
    name: 'Искусство',
  },
  pets: {
    id: 'CC01000021',
    name: 'Питомцы',
  },
  food: {
    id: 'CC00000009',
    name: 'Еда',
  },
  car: {
    id: 'CC00000002',
    name: 'Автомобили',
  },
  sport: {
    id: 'CC00000008',
    name: 'Спорт',
  },
  movie: {
    id: 'CC01000020',
    name: 'Фильмы',
  },
  reading: {
    id: 'CC00000005',
    name: 'Чтение',
  },
  life: {
    id: 'f1920a8c-6007-11e5-950a-002590c3ab24',
    name: 'Жизнь',
  },
  home: {
    id: 'CC01000014',
    name: 'Дом',
  },
  travel: {
    id: '6c25ff6d-39a4-11e5-83cb-70e52b253bb7',
    name: 'Путешествия',
  },
  fashion: {
    id: 'CC00000012',
    name: 'Мода',
  },
  beauty: {
    id: 'CC01000022',
    name: 'Прекрасное',
  },
  sexy: {
    id: 'CC01000013',
    name: 'Сексуальные',
  },
  actress: {
    id: '78753f1a-39a4-11e5-83cb-70e52b253bb7',
    name: 'Актрисы',
  },
  actor: {
    id: 'CC01000019',
    name: 'Актеры',
  },
  news: {
    id: '8532cf1f-39a4-11e5-83cb-70e52b253bb7',
    name: 'Новости',
  },
}

async function lock(category, id) {
  let channelId = ''

  if (categorys[category]) channelId = categorys[category].id
  const api = await axios.get(`${apiUri}lock/lock_view?_res=hd1000&_eimi=tg_ly_${id}&channel_id=${channelId}&page_size=1`)

  if (api.data.items.length > 0) {
    const image = api.data.items[0].images[0].cl_url

    return `${image.url_root}png/w1000/${image.locator}`
  }

  return null
}

module.exports = {
  lock,
  categorys,
}
