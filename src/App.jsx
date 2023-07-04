import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styles from "./app.module.scss";

const Home = lazy(() => import("./pages/Home"));
const Types = lazy(() => import("./pages/Types"));
const Pokemon = lazy(() => import("./pages/PokemonDetail"));
const PokemonsType = lazy(() => import("./pages/PokemonsType"));

const navList = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Types",
    path: "/types",
  },
];

export const App = () => {
  return (
    <>
      <header className={styles.header}>
        <ul className={styles.navList}>
          {navList.map((item) => (
            <li key={item.label} className={styles.navListItem}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </header>
      <div className={styles.content}>
        <Routes>
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path='/types'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Types />
              </Suspense>
            }
          />
          <Route
            path='/pokemon/:id'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Pokemon />
              </Suspense>
            }
          />
          <Route
            path='/types/:id'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PokemonsType />
              </Suspense>
            }
          />
          <Route path='*' element={<h3>Not found !</h3>} />
        </Routes>
      </div>
    </>
  );
};
