import { getTweet } from 'vue-better-tweet/api'

export default defineCachedEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError("Missing id")
  }

  const data = await getTweet(id);

  if (!data) {
    throw createError("Tweet not found")
  }

  return { data }
}, { maxAge: 3600 * 24 });