import Shownote from './Shownote'
import Moment from 'react-moment'
import Highlighter from  'react-highlight-words'
import { escape, unescape } from 'html-escaper';
import escapeStringRegexp from 'escape-string-regexp'

export default function Episode({ episode, query }) {
  return (
    <div className='episode'>
      <span className='epititle'><a href={ episode.mediaUrl } target='_blank' rel='noopner noreferrer'><Highlighter highlightClassName='highlight' searchWords={ [ escapeStringRegexp(query) ] } textToHighlight={ unescape(episode.title).replace(/&nbsp;/g, ' ') } /></a></span> <span className='pubdate'>(<Moment format='YYYY/MM/DD'>{ episode.publicationDate }</Moment>)</span>
      <span>{ episode.shownotes.map((shownote, i) => <Shownote shownote={ shownote } query={ query } key={ i } />)}</span>
    </div>
  );
}
