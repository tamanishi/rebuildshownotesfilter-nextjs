import Shownote from './Shownote'
import { useState, useEffect } from 'react'
import Moment from 'react-moment'
import Highlighter from  'react-highlight-words'
import { escape, unescape } from 'html-escaper';
import escapeStringRegexp from 'escape-string-regexp'

export default function Episode({ episode, query }) {
  const [isClient, setIsClient] = useState(false);  
  useEffect(() => setIsClient(true), []);

    return (
    <div className='episode'>
      <a className='epititle' href={ episode.mediaUrl } target='_blank' rel='noopner noreferrer'><Highlighter highlightClassName='highlight' searchWords={ [ escapeStringRegexp(query) ] } textToHighlight={ unescape(episode.title).replace(/&nbsp;/g, ' ') } /></a> 
      (<Moment format='YYYY/MM/DD'>{ isClient ? episode.publicationDate : '' }</Moment>)
      {/* <span className='pubdate'>(<time dateTime={ episode.publicationDate }>{isClient ? hhhhmmdd(dt) : ''}</time>)</span> */}
      <ul>{ episode.shownotes.map((shownote, i) => <Shownote shownote={ shownote } query={ query } key={ i } />)}</ul>
    </div>
  );
}
