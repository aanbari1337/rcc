import { useEffect, useState } from "react";
import useAsync, { IDLE } from "../../utils/useAsync";
import styles from "./styles.module.scss";

const Evolution = ({ id }) => {
  const { run, data, loading, error, status } = useAsync();
  const [evolutions, setEvolutions] = useState([]);
  useEffect(() => {
    run(fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`));
  }, [run, id]);

  useEffect(() => {
    if (data) {
      let possibleEvolutions = extractEvolutions(data);
      setEvolutions(possibleEvolutions);
    }
  }, [data]);

  if (status === IDLE || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  function extractEvolutions(data) {
    const chain = data.chain;
    const evolutions = [];

    const traverseChain = (evolutionData) => {
      const { species, evolves_to } = evolutionData;

      evolutions.push(species.name);

      evolves_to.forEach((evolution) => {
        traverseChain(evolution);
      });
    };

    traverseChain(chain);

    return evolutions;
  }

  return (
    <div className={styles.evolutions}>
      <h3>Evolutions</h3>

      <ul>
        {evolutions.map((evolution) => (
          <li key={evolution}>{evolution}</li>
        ))}
      </ul>
    </div>
  );
};

export default Evolution;
