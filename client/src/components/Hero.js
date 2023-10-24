import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Hero() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5555/heroes/${id}`);

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData);
          setStatus("rejected");
        } else {
          const heroData = await response.json();
          setHero(heroData);
          setStatus("resolved");
        }
      } catch (error) {
        setError(error);
        setStatus("rejected");
      }
    };

    fetchData();
  }, [id]);

  if (status === "pending") {
    return <h1>Loading...</h1>;
  }

  if (status === "rejected") {
    return <h1>Error: {error ? error.message : "Network response was not ok"}</h1>;
  }

  return (
    <section>
      <h2>{hero.super_name}</h2>
      <h2>AKA {hero.name}</h2>

      <h3>Powers:</h3>
      <ul>
        {hero.powers.map((power) => (
          <li key={power.id}>
            <Link to={`/powers/${power.id}`}>{power.name}</Link>
          </li>
        ))}
      </ul>

      <Link to="/hero_powers/new">Add Hero Power</Link>
    </section>
  );
}

export default Hero;
