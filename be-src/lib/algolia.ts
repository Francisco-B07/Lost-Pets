import algoliasearch from "algoliasearch";

// For the search only version
// import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch("C1K32QGASU", "bc275d721012dd7e871cb2ce6c54c66e");
const index = client.initIndex("pets");

export { index };
