import algoliasearch from "algoliasearch";

// For the search only version
// import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch("C1K32QGASU", process.env.ALGOLIA_KEY);
const index = client.initIndex("pets");

export { index };
