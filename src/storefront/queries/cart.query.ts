/**
 * get max Qty from storefront api
 */
export const GET_MAX_QTY_QUERY = `#graphql
  query getMaxQty($gid: ID!){
    product(id: $gid) {
      maxQty: metafield(namespace: "custom", key: "max_qty") {
        value
      }
    }
  }
`

/**
 * get Inventories from storefront api
 */
export const GET_INVENTORIES_QUERY = `#graphql
  query getInventories($query:String) {
    products(first: 250, query: $query) {
      nodes {
        totalInventory
        id
      }
    }
  }
`
