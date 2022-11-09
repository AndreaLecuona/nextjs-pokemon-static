import { Grid } from "@nextui-org/react";
import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layouts";
import { PokemonCard } from "../components/pokemon";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { pokeApi } from "../personalApi";

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  // console.log(pokemons)
  return (
    <Layout title="Listado de pokemon">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((po) => (
          <PokemonCard key={po.id} pokemon={po}/>
        ))}
      </Grid.Container>
    </Layout>
  );
};

//SE EJECUTA PREVIAMENTE A QUE APAREZCA LA PAGINA EN PANTALLA RENDERIZADA:
export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  //console.log(data); //este log sólo se visualiza en la terminal

  const pokemons: SmallPokemon[] = data.results.map((pok, index) => ({
    ...pok,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    }, // will be passed to the page component as props
  };
};

export default Home;
