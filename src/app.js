import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "ARXcxmhHFcl7zixe0q7qjkWbG0oZGqcR", // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "loi3dcv90ae5bj8pp-1.a1.typesense.net", // Replace with your Typesense Cloud host name
        port: 443, // Replace with your Typesense Cloud port
        protocol: "https" // Replace with "https" for Typesense Cloud
      }
    ]
  },
  additionalSearchParameters: {
    query_by: "product_name"
  }
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
  searchClient,
  indexName: "products"
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 5,
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div class="hit-grid-item">
          <img class="hit-image" src="{{{images[0]}}}" alt="" />
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "product_name" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "original_price" }{{/helpers.highlight}}
          </div>
        </div>
      `,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
