import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PokemonList } from "../../components";
import useAsync from "../../utils/useAsync";

const PokemonsType = () => {
  const { id: type } = useParams();
  const { data: pokemons, run, error, loading, status } = useAsync();

  useEffect(() => {
    run(fetch(`https://pokeapi.co/api/v2/type/${type}/?limit=20`));
  }, [run, type]);

  return (
    <div>
      <h1>Pokemons of Type {type}</h1>
      <PokemonList
        pokemons={pokemons?.pokemon}
        status={status}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default PokemonsType;
