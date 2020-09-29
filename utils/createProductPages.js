
const productTemplate = require.resolve("../src/templates/product.js");
const archiveTemplate = require.resolve("../src/templates/archive.js");
const cartTemplate = require.resolve("../src/templates/cart.js");
const chunk = require("lodash/chunk");

module.exports = async ({ actions, graphql, basePath }) => {
  const result = await graphql(`
      query {
        wpgraphql {
          products(first: 500, where: {type: SIMPLE}) {
            nodes {
              ... on WPGraphQL_SimpleProduct {
                id
                name
                description
                image {
                  sourceUrl
                }
                attributes {
                  nodes {
                    name
                  }
                }
                price
                onSale
                slug
                status
                type
                regularPrice
                salePrice(format: FORMATTED)
                imageFile {
                  childImageSharp {
                    fixed( width: 500) {
                      width
                      height
                      src
                      srcSet
                      base64
                      tracedSVG
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    `)

  const products = result.data.wpgraphql.products.nodes

  // Create signle page for each product.
  products.forEach(product => {
    actions.createPage({
      path: basePath + product.slug,
      component: productTemplate,
      context: {
        id: product.id,
      },
    })
  })

  // Create paginated list of products.
  const perPage = 6
  const listPages = chunk(products, perPage)
  const totalArchivePages = listPages.length;

  listPages.forEach((archiveProduts, index) => {
    const page = index + 1;
    actions.createPage({
      path: page === 1 ? basePath : basePath + page,
      component: archiveTemplate,
      context: {
        products: archiveProduts,
        pageInfo: {
          basePath: basePath,
          previousPage: page - 1,
          nextPage: page == totalArchivePages ? 0 : page + 1
        }
      },
    })
  })

  // Create cart page.
  actions.createPage({
    path: basePath + 'cart',
    component: cartTemplate
  })
}
