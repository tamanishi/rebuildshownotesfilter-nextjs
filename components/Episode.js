import Shownote from './Shownote'
import { useState, useEffect } from 'react'
import Moment from 'react-moment'
import Highlighter from  'react-highlight-words'
import { escape, unescape } from 'html-escaper';
import escapeStringRegexp from 'escape-string-regexp'

export default function Episode({ episode, query }) {
  // see https://github.com/vercel/next.js/discussions/38263
  // see https://zenn.dev/noonworks/scraps/2114c8bab9a66e
  const pubDate = new Date(episode.PublicationDate)
    
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), []);

    return (
    <div className='episode'>
      <a className='epititle' href={ episode.mediaUrl } target='_blank' rel='noopner noreferrer'><Highlighter highlightClassName='highlight' searchWords={ [ escapeStringRegexp(query) ] } textToHighlight={ unescape(episode.title).replace(/&nbsp;/g, ' ') } /></a> ({isClient ? <Moment format='YYYY/MM/DD'>{ episode.publicationDate }</Moment> : ''})
      <ul>{ episode.shownotes.map((shownote, i) => <Shownote shownote={ shownote } query={ query } key={ i } />)}</ul>
    </div>
  );
}
