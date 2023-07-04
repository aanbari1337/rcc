import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const PokemonItem = ({ pokemon: { name } }) => {
  return (
    <li className={styles.item} key={name}>
      <Link to={`/pokemon/${name}`}>{name}</Link>
    </li>
  );
};

export default PokemonItem;
