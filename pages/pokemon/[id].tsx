import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/layouts";
import { pokeApi } from "../../personalApi";
import { Pokemon } from "../../interfaces";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { getPokemonInfo, localFavorites } from "../../utils";
import confetti from 'canvas-confetti';

//3. define interface y usa en el componente las props
interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();
  // console.log(router.query);
  // console.log(pokemon);

  const [isInFavorites, setisInFavorites] = useState(false);

  useEffect(() => {
    setisInFavorites(localFavorites.existsInFavorites( pokemon.id ))
  }, [ pokemon.id ])
  
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setisInFavorites(!isInFavorites);

    if(!isInFavorites){
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0
        }
      })
    }
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button color="gradient" ghost={!isInFavorites} onPress={onToggleFavorite}>
                {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

//1.creamos en build time la cantidad de parámetros que vamos a necesitar:
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false, // can also be true or 'blocking'
  };
};

//2.recibe los parámetros fijos que se crearon previamente, accede a través del context y los retornará como props para que los use el componente
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };

  // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      // pokemon: data,
      pokemon: await getPokemonInfo(id)
    },
  };
};

export default PokemonPage;
