const Typesense = require('typesense');
const fs = require('fs');

async function main() {
  let client = new Typesense.Client({
    'nodes': [{
      'host': 'loi3dcv90ae5bj8pp-1.a1.typesense.net', // Replace with your Typesense Cloud host name
      'port': '443',      // Replace with your Typesense Cloud port
      'protocol': 'https'   // Replace with 'https' for Typesense Cloud
    }],
    'apiKey': 'az2ER1GRbi4zw0Ns4Xf4NFm3oElGI2Eh',
    'connectionTimeoutSeconds': 2
  });

  let productsSchema = {
    'name': 'products',
    'fields': [
      { 'name': 'product_name', 'type': 'string' },
      { 'name': 'original_price', 'type': 'int32' },
      { 'name': 'images', 'type': 'string[]' },
    ],
  };

  try {
    await client.collections('products').delete();
    await client.collections().create(productsSchema);
    const documents = fs.readFileSync('./products.jsonl', 'utf8');
    await client.collections('products').documents().import(documents, { batch_size: 100 });
    console.log('Import completed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
