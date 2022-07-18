import Highlighter from  'react-highlight-words'
import { escape, unescape } from 'html-escaper';
import escapeStringRegexp from 'escape-string-regexp'

export default function Shownote({ shownote, query }) {
  return (
    <li className='shownote'><a href={ shownote.url } target='_blank' rel='noopner noreferrer'><Highlighter highlightClassName='highlight' searchWords={ [ escapeStringRegexp(query) ] } textToHighlight={ unescape(shownote.title).replace(/&nbsp;/g, ' ') } /></a></li>
  );
}
