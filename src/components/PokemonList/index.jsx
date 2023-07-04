import { IDLE } from "../../utils/useAsync";
import PokemonItem from "../PokemonItem";
import styles from "./styles.module.scss";

const PokemonList = ({
  pokemons,
  next,
  previous,
  run,
  status,
  error,
  loading,
}) => {
  console.log(pokemons);

  const handlePagination = (e) => {
    const target = e.target.getAttribute("data-id");
    const url = target === "next" ? next : previous;
    run(fetch(url));
  };

  if (status === IDLE || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!pokemons.length) return <h3>0 results</h3>;

  return (
    <>
      <ul className={styles.list}>
        {pokemons.map((item) => {
          let pokemon = item;
          if (item.pokemon) pokemon = item.pokemon;
          return <PokemonItem key={pokemon.name} pokemon={pokemon} />;
        })}
      </ul>
      {!next && !previous ? null : (
        <div className={styles.pagination}>
          <button
            disabled={!previous}
            data-id='previous'
            onClick={handlePagination}
          >
            previous
          </button>
          <button disabled={!next} data-id='next' onClick={handlePagination}>
            next
          </button>
        </div>
      )}
    </>
  );
};

export default PokemonList;
