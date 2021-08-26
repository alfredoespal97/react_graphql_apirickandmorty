import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

const CharactersQuery = gql`
  {
    characters {
      results {
        id
        name
        status
      }
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(CharactersQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.characters.results.map((character) => {
    return <p key={character.id}>{character.name}</p>;
  });
}

function App() {
  return (
    <div className="App">
      <ExchangeRates />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
