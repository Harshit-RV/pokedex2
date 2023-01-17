import Head from "next/head"

function Moves({ moves }) {
    return (<>
        <Head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        </Head>
        <h1 className="well" style={{ textAlign: 'center' }}>Moves</h1>
        <ul className="list-group">
            {moves.map((move, i) => {
                return (<li className="list-group-item" key={i}>
                    {move.move.name}
                </li>)
            })}
        </ul>
    </>)
}
export default Moves

export async function getServerSideProps(context) {
    const { pokemonId } = context.query
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        let { moves } = await res.json()
        return {
            props: { moves },
        }
    } catch (e) {
        console.log(e)
    }
}
