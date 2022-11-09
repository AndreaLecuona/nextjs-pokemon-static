import React, { FC } from "react";
import { Grid } from "@nextui-org/react";
import { FavoriteCard } from "./";

interface Props {
    pokemonsList: number[];
}

export const FavoritePokemons: FC<Props> = ({ pokemonsList }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemonsList.map((id) => (
        <FavoriteCard pokemonId={id} key={id} />
      ))}
    </Grid.Container>
  );
};
