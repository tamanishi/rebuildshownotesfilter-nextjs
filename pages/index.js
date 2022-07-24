import Head from 'next/head'
import Script from 'next/script'
import Episode from '../components/Episode'
import Header from '../components/Header'
import Query from '../components/Query'
import { useState, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
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
          const filteredByShownote = props.fullEpisodes.map(episode => ({
            ...episode,
            shownotes: episode.shownotes
              .filter(shownote => shownote.title.toLowerCase().includes(escape(query.toLowerCase())))
          }))
            .filter(episode => episode.shownotes.length > 0)

          const filteredByTitle = props.fullEpisodes.map(episode => ({
            ...episode,
            shownotes: episode.shownotes
              .filter(shownote => shownote.title.toLowerCase().includes(escape(query.toLowerCase())))
          }))
            .filter(episode => episode.shownotes.length == 0)
            .filter(episode => (episode.title.toLowerCase().includes(escape(query.toLowerCase()))))

          const filtered = [...filteredByShownote, ...filteredByTitle]
            .sort((a, b) => {
              return a.publicationDate > b.publicationDate ? -1 : 1
            })

          setFilteredEpisodes(filtered)
        } else {
          setFilteredEpisodes(props.fullEpisodes)
        }
      },
        300)
      return () => clearTimeout(intervalRef.current)
    },
    [query]
  )

  return (
    <>
      <Head>
        <title>Rebuild Shownotes Filter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <Header />
        <Query setQuery={setQuery} />
        {filteredEpisodes.map((episode, i) => <Episode episode={episode} query={query} key={i} />)}
      </Container>
      { /* Cloudflare Web Analytics */}
        <Script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "34dc3c5f1435491fb76024f7e2f2e5b4"}' />
      { /* End Cloudflare Web Analytics */}
    </>
  );
}
