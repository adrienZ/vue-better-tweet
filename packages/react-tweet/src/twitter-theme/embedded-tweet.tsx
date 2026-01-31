import type { Tweet } from '../api/index.js'
import type { TwitterComponents } from './types.jsx'
import { TweetContainer } from './tweet-container.jsx'
import { TweetHeader } from './tweet-header.jsx'
import { TweetInReplyTo } from './tweet-in-reply-to.jsx'
import { TweetBody } from './tweet-body.jsx'
import { TweetMedia } from './tweet-media.jsx'
import { TweetInfo } from './tweet-info.jsx'
import { TweetActions } from './tweet-actions.jsx'
import { TweetReplies } from './tweet-replies.jsx'
import { QuotedTweet } from './quoted-tweet/index.js'
import { enrichTweet } from '../utils.js'
import { useMemo } from 'react'

type Props = {
  tweet: Tweet
  components?: Omit<TwitterComponents, 'TweetNotFound'>
}

export const EmbeddedTweet = ({ tweet: t, components }: Props) => {
  // useMemo does nothing for RSC but it helps when the component is used in the client (e.g by SWR)
  const tweet = useMemo(() => enrichTweet(t), [t])
  return (
    <TweetContainer>
      <TweetHeader tweet={tweet} components={components} />
      {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
      <TweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? (
        <TweetMedia tweet={tweet} components={components} />
      ) : null}
      {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} components={components} />}
      <TweetInfo tweet={tweet} />
      <TweetActions tweet={tweet} />
      <TweetReplies tweet={tweet} />
    </TweetContainer>
  )
}
