import Head from "next/head"
import Link from "next/link"

function PokemonDetails({ data }) {
    String()
    return (<>
        <Head>
            <title>pokedex</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        </Head>
        <div className="well">
            <ul className="list-group">
                <li className="list-group-item"><h1>{String(data.name).charAt(0).toUpperCase() + String(data.name).slice(1)}</h1></li>
                <li className="list-group-item"><img src={data.image}></img></li>
                <li className="list-group-item"><div>Weight:{data.weight}</div></li>
                <li className="list-group-item"><div>Height:{data.height}</div></li>
                <li className="list-group-item"><div>Base Experience:{data.base_experience}</div></li>
                <li className="list-group-item"><div>Types:<ul className="nav nav-pills">
                    {data.types.map((type, i) => {
                        return (<li key={i} className="nav-item active">
                            <a>{type.type.name}</a>
                        </li>)
                    })}
                </ul>
                </div>
                </li>
                <li className="list-group-item"><div>Stats:<ul className="list-group">
                    {data.stats.map((stat, i) => {
                        return (<li key={i} className="list-group-item">
                            {stat.stat.name.toUpperCase()} : {stat.base_stat}
                        </li>)
                    })}
                </ul>
                </div>
                </li>
                <li className="list-group-item"><Link class="previous" href={`/${data.id}/moves`}>Moves</Link></li>
            </ul>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link href="/" >Home</Link>
            </div>
        </div>
    </>)
}
export default PokemonDetails

export async function getServerSideProps(context) {
    const { pokemonId } = context.query
    try {

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        let data = await res.json()
        let i = (pokemonId < 10 ? '00' : pokemonId < 100 ? '0' : '') + String(pokemonId)
        let image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${i}.png`
        data = { ...data, image }
        return {
            props: { data },
        }
    } catch (e) {
        console.log(e)
    }
}