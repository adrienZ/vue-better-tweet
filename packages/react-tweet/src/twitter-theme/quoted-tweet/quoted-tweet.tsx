import type { EnrichedQuotedTweet } from '../../utils.js'
import type { TwitterComponents } from '../types.jsx'
import { QuotedTweetContainer } from './quoted-tweet-container.jsx'
import { QuotedTweetHeader } from './quoted-tweet-header.jsx'
import { QuotedTweetBody } from './quoted-tweet-body.jsx'
import { TweetMedia } from '../tweet-media.jsx'

type Props = { tweet: EnrichedQuotedTweet, components?: TwitterComponents }

export const QuotedTweet = ({ tweet, components }: Props) => (
  <QuotedTweetContainer tweet={tweet}>
    <QuotedTweetHeader tweet={tweet} components={components} />
    <QuotedTweetBody tweet={tweet} />
    {tweet.mediaDetails?.length ? <TweetMedia quoted tweet={tweet} /> : null}
  </QuotedTweetContainer>
)
