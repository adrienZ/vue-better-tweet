import { fetchTweet, type Tweet } from 'vue-better-tweet/api'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing tweet id' })
  }

  const storage = useStorage<Tweet>("data")
  const cacheKey = `tweet:${id}`

  const cachedTweet = await storage.getItem(cacheKey)
  if (cachedTweet) return { data: cachedTweet}

  try {
    const { data, tombstone, notFound } = await fetchTweet(id)

    if (data) {
      await storage.setItem(cacheKey, data)
      return { data }
    }

    if (tombstone || notFound) {
      await storage.removeItem(cacheKey)
      throw createError({ statusCode: 404, statusMessage: 'Tweet not found' })
    }
  } catch (error) {
    console.error('fetching the tweet failed with:', error)
  }

  throw createError({ statusCode: 404, statusMessage: 'Tweet not found' })
})
