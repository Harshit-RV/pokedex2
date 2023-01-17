import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

let limit = 300

function Home({ pokemon }) {
  const [search, setSearch] = useState("")
  const [poke, setPoke] = useState(pokemon.slice(0, limit))
  return (<>
    <Head>
      <title>pokedex</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
    </Head>
    <h1 className='well' style={{ textAlign: 'center' }}>Pokedex</h1>
    <input className='form-control' type="text" value={search} placeholder="Search for Pokemon" onChange={(e) => {
      setSearch(e.target.value)
      setPoke(pokemon.filter((p) => { return (p.name.includes(e.target.value)) }))
    }} />
    <ul className='list-group'>
      {poke.map((p, i) => {
        return (
          <li key={i} className="well list-group-item">
            <Link href={`/${p.id + 1}`} className="row">
              <img src={p.image} className="col-sm-2" />
              <h2 className="col-sm-3 well">{String(p.name).charAt(0).toUpperCase() + String(p.name).slice(1)}</h2>
            </Link>
          </li>)
      })}
    </ul>

  </>)
}
export default Home

export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + String(limit));
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      let i = (index + 1 < 10 ? '00' : index + 1 < 100 ? '0' : '') + String(index + 1)
      let image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${i}.png`

      return { ...result, image, id: index }
    })
    return {
      props: { pokemon },
    }
  } catch (e) {
    console.log(e)
  }

}