import { lazy } from "react";

import Pokemon from "./PokemonDetail";
import PokemonsType from "./PokemonsType";

const Home = lazy(() => import("./Home"));
const Types = lazy(() => import("./Types"));

export { Home, Pokemon, Types, PokemonsType };
