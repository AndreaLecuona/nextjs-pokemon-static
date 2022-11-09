import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { FavoritePokemons } from "../../components/pokemon";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";


const FavoritesPage = () => {
  const [favoritePokemonsList, setFavoritePokemonsList] = useState<number[]>(
    []
  );

  useEffect(() => {
    setFavoritePokemonsList(localFavorites.favoritePokemonsGetter());
  }, []);

  return (
    <Layout title="Pokemon favoritos">
      {favoritePokemonsList.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemonsList={favoritePokemonsList} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
