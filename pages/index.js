import Head from 'next/head'
import Episode from '../components/Episode'
import Header from '../components/Header'
import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { escape, unescape } from 'html-escaper'

async function getEpisodes() {
  const endpoint = `https://raw.githubusercontent.com/tamanishi/rebuild_feed_to_json_go/master/episodes.json`
  // const endpoint = `https://rebuild-shownotes-json.tamanishi.workers.dev/`
  const res = await fetch(endpoint)
  const json = await res.json()
  return json.episodes
}

export async function getStaticProps() {
  const episodes = await getEpisodes()
  return {
    props: {
      fullEpisodes: episodes,
    }
  }
}

export default function Index(props) {
  const [filteredEpisodes, setFilteredEpisodes] = useState(props.fullEpisodes)
  const [query, setQuery] = useState("")
  const intervalRef = useRef(null)

  useEffect(
    () => {
      intervalRef.current = setTimeout(() => {
        if (query) {
          const filtered = props.fullEpisodes.map(episode => ({
            ...episode,
            shownotes: episode.shownotes
              .filter(shownote => shownote.title.toLowerCase().includes(escape(query.toLowerCase())))
          }))
          .filter(episode => episode.shownotes.length > 0)

          setFilteredEpisodes(filtered)
        } else {
          setFilteredEpisodes(props.fullEpisodes)
        }
      },
      500)
      return () => clearTimeout(intervalRef.current)
    },
    [query]
  )

  return (
      <>
        <Head>
          <title>Rebuild Shownotes Filter</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          {/* Cloudflare Web Analytics */}
            <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "c97ca1a072c64347840c289ee37a04e6"}' />
          {/* End Cloudflare Web Analytics */}
        </Head>
        <Container>
          <Header />
          <Row><Col xs="3"><Form.Control type='text' placeholder='query' onChange={ e => setQuery(e.target.value) } /></Col></Row>
            { filteredEpisodes.map((episode, i) => <Episode episode={ episode } query={ query } key={ i } />)}
        </Container>
      </>
  );
}
