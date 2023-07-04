import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAsync, { IDLE } from "../../utils/useAsync";

function Types() {
  const { run, data: types, loading, error, status } = useAsync();

  useEffect(() => {
    run(fetch("https://pokeapi.co/api/v2/type?limit=20"));
  }, [run]);

  if (status === IDLE || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(types);
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>List of types</h1>
      <ul>
        {types.results.map((type) => (
          <li key={type.name}>
            <Link to={`/types/${type.name}`}>{type.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Types;
