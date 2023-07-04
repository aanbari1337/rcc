import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Evolution } from "../../components";
import useAsync, { IDLE } from "../../utils/useAsync";
import styles from "./styles.module.scss";

function Pokemon() {
  const { id } = useParams();
  const { data: pokemon, run, error, loading, status } = useAsync();

  useEffect(() => {
    run(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`));
  }, [run, id]);

  if (status === IDLE || loading) return <span>Loading...</span>;
  if (error) return <h3>{error}</h3>;

  console.log(pokemon);
  return (
    <div className={styles.pokemon}>
      <h2 className={styles["pokemon-name"]}>{pokemon.name}</h2>
      <img
        className={styles["pokemon-cover"]}
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <span className={styles["pokemon-type"]}>
        Type: {pokemon.types.map((type) => type.type.name).join(", ")}
      </span>
      <Evolution id={pokemon.id} />
    </div>
  );
}

// wait for image to load

export default Pokemon;
