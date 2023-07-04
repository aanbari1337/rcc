import { Input, PokemonList } from "../../components";
import { useEffect } from "react";
import useAsync from "../../utils/useAsync";
import { useState } from "react";
import debounce from "lodash/debounce";

function Home() {
  const { run, data, loading, error, status } = useAsync();
  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState("");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");

  useEffect(() => {
    run(fetch("https://pokeapi.co/api/v2/pokemon?limit=20"));
  }, [run]);

  useEffect(() => {
    if (data) {
      setPokemons(data.results);
      setNext(data.next);
      setPrevious(data.previous);
    }
  }, [data]);

  const functionDebounce = debounce((query) => {
    const regex = new RegExp("^" + query, "i");
    let filteredPokemons = data.results.filter((item) => {
      return regex.test(item.name);
    });
    setPokemons(filteredPokemons);
  }, 500);

  const handleOnchange = (e) => {
    setQuery(e.target.value);
    functionDebounce(e.target.value);
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>List of pokemons</h1>
      <Input
        placeholder='Search by name'
        value={query}
        onChange={handleOnchange}
      />
      <PokemonList
        pokemons={pokemons}
        next={next}
        previous={previous}
        run={run}
        status={status}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default Home;
