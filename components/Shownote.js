import Highlighter from  'react-highlight-words'
import { escape, unescape } from 'html-escaper';

export default function Shownote({ shownote, query }) {
  return (
    <li><a href={ shownote.url } target='_blank' rel='noopner noreferrer'><Highlighter highlightClassName='highlight' searchWords={ [ query ] } textToHighlight={ unescape(shownote.title).replaceAll('&nbsp;', ' ') } /></a></li>
  );
}
