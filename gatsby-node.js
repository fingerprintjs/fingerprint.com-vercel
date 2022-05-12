// eslint can't know something inside a query is a regex and complains about escaping.
/* eslint no-useless-escape: 0 */

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const webpack = require(`webpack`)
const remark = require(`remark`)
const remarkHTML = require(`remark-html`)
const fetch = require(`node-fetch`)
const { createSocialCardNode } = require('./src/node/social-card/create-social-card-node')
const { createSocialCardId } = require('./src/node/create-node-field/create-social-card-id')

async function getFolderEdges(folder, graphql, filter = '') {
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: {
          fileAbsolutePath: {regex: "/(${folder})/.*\.md$/"}
          ${filter}
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              metadata {
                url
              }
              authors
            }
          }
        }
      }
    }
  `)

  if (errors) {
    // eslint-disable-next-line no-console
    errors.forEach((e) => console.error(e.toString()))
    return Promise.reject(errors)
  }

  return data.allMarkdownRemark.edges
}

async function getArrayFieldValues(graphql, name) {
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { isPublished: { ne: false }, isHidden: {ne: true}, templateKey: { eq: "long-form-content" } } }
      ) {
        group(field: frontmatter___${name}s) {
          ${name}: fieldValue
          totalCount
        }
      }
    }
  `)

  if (errors) {
    // eslint-disable-next-line no-console
    errors.forEach((e) => console.error(e.toString()))
    return Promise.reject(errors)
  }

  return data.allMarkdownRemark.group
}

async function getArrayAuthorsTags(graphql, author) {
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { authors: {in: ["${author}"]}, isPublished: { ne: false }, isHidden: {ne: true}, templateKey: { eq: "long-form-content" } } }
      ) {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (errors) {
    // eslint-disable-next-line no-console
    errors.forEach((e) => console.error(e.toString()))
    return Promise.reject(errors)
  }

  return data.allMarkdownRemark.group
}

function withTrailingSlash(path) {
  return path.endsWith('/') ? path : `${path}/`
}

function getRelativeUrl(url) {
  const relativeUrl = url.match(/fingerprint.com(\/.*)$/)
  return relativeUrl ? withTrailingSlash(relativeUrl[1]) : '/'
}

function createPageFromEdge(edge, createPage, additionalContext = {}) {
  const id = edge.node.id
  const url = edge.node.frontmatter.metadata?.url

  createPage({
    path: url ? getRelativeUrl(url.replace(/\s+/g, '-')) : edge.node.fields.slug.replace(/\s+/g, '-'),
    tags: edge.node.frontmatter.tags,
    component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`),
    // additional data can be passed via context
    context: {
      id,
      ...additionalContext,
    },
  })
}

function createPaginatedPages(numPages, itemsPerPage, pathname, template, createPage, additionalContext = {}) {
  for (let i = 0; i < numPages; ++i) {
    createPage({
      // The first page doesn't need a number.
      path: `${pathname.replace(/\s+/g, '-')}${i === 0 ? '/' : `/${i + 1}/`}`,
      component: path.resolve(template),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1,
        ...additionalContext,
      },
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const pages = await getFolderEdges('index', graphql)
  pages.forEach((edge) => createPageFromEdge(edge, createPage))

  const blogPosts = await getFolderEdges(
    'blog',
    graphql,
    'frontmatter: { isPublished: { ne: false }, isHidden: {ne: true} }'
  )
  blogPosts.forEach((edge) => createPageFromEdge(edge, createPage))

  const blogPostsHidden = await getFolderEdges(
    'blog',
    graphql,
    'frontmatter: { isPublished: { ne: false }, isHidden: {ne: false} }'
  )
  blogPostsHidden.forEach((edge) => createPageFromEdge(edge, createPage, { noIndex: true }))

  const caseStudies = await getFolderEdges('case-study', graphql)
  caseStudies.forEach((edge) => createPageFromEdge(edge, createPage))

  // TODO Temporarily hiding until it is released in production
  /*   const solutions = await getFolderEdges('solutions/solutions', graphql, 'frontmatter: { isPublished: { ne: false } }')
  solutions.forEach((edge) => createPageFromEdge(edge, createPage)) */

  const postsPerPage = 12

  const numBlogPages = Math.ceil(blogPosts.length / postsPerPage)
  createPaginatedPages(numBlogPages, postsPerPage, 'blog', 'src/templates/blog.tsx', createPage)

  const numCaseStudyPages = Math.ceil(caseStudies.length / postsPerPage)
  createPaginatedPages(numCaseStudyPages, postsPerPage, 'case-studies', 'src/templates/case-studies.tsx', createPage)

  const tags = await getArrayFieldValues(graphql, 'tag')
  tags.forEach(({ tag, totalCount }) => {
    const numTagPages = Math.ceil(totalCount / postsPerPage)
    const additionalContext = { tag }

    createPaginatedPages(
      numTagPages,
      postsPerPage,
      `blog/tag/${tag.toLowerCase()}`,
      'src/templates/blog-tag.tsx',
      createPage,
      additionalContext
    )
  })

  const authors = await getArrayFieldValues(graphql, 'author')
  authors.forEach(({ author, totalCount }) => {
    const numAuthorPages = Math.ceil(totalCount / postsPerPage)
    const additionalContext = { author }

    createPaginatedPages(
      numAuthorPages,
      postsPerPage,
      `blog/author/${author.toLowerCase()}`,
      'src/templates/author.tsx',
      createPage,
      additionalContext
    )
  })

  const createAuthorTagPages = authors.map(async (authorObj) => {
    const author = authorObj.author
    const authorTags = await getArrayAuthorsTags(graphql, author)

    if (authorTags) {
      authorTags.forEach(({ tag, totalCount }) => {
        const numAuthorTagPages = Math.ceil(totalCount / postsPerPage)
        const additionalContext = { author, tag }

        createPaginatedPages(
          numAuthorTagPages,
          postsPerPage,
          `blog/author/${author.toLowerCase()}/${tag}`,
          'src/templates/author-tag.tsx',
          createPage,
          additionalContext
        )
      })
    }
  })
  await Promise.all(createAuthorTagPages)
}

function createNodePath({ node, getNode }) {
  const directory = getNode(node.parent).relativeDirectory
  const filename = path.basename(node.fileAbsolutePath, path.extname(node.fileAbsolutePath))

  switch (directory) {
    case 'index':
      // For nodes inside the index directory, the path is the filename.
      return filename
    default:
      // For other nodes, the path is directory/filename.
      return createFilePath({ node, getNode })
  }
}

exports.onCreateNode = async ({ node, actions, getNode, getCache, createNodeId }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createNodePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    if (node.frontmatter.templateKey === 'case-study-content') {
      const socialCardNode = await createSocialCardNode(node, actions, getCache, createNodeId)
      createSocialCardId(node, socialCardNode, actions)
    }
  }
}

function getWebpackPlugin(config, name) {
  return config.plugins.find((plugin) => plugin.constructor.name === name)
}

function configureMiniCssExtractPlugin(config) {
  const miniCssExtractPlugin = getWebpackPlugin(config, 'MiniCssExtractPlugin')

  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.ignoreOrder = true
  }
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  //To ignore the css order warnings in gatsby v3 in develop it is necessary to add stage === 'develop'
  if (stage === 'develop' || stage === 'build-javascript') {
    const config = getConfig()

    configureMiniCssExtractPlugin(config)

    actions.replaceWebpackConfig(config)
  }

  actions.setWebpackConfig({
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^netlify-identity-widget$/,
      }),
    ],
  })
}

exports.sourceNodes = async ({ actions, getNodes, createContentDigest }) => {
  const { createNodeField, createNode } = actions

  const blogPosts = getNodes().filter(
    (node) => node.internal.type === 'MarkdownRemark' && /(blog)\/.*.md$/.test(node.fileAbsolutePath)
  )
  const authors = getNodes().filter(
    (node) => node.internal.type === 'MarkdownRemark' && /(author)\/.*.md$/.test(node.fileAbsolutePath)
  )

  blogPosts.forEach((node) => {
    if (node.frontmatter.authors) {
      const authorNodes = authors.filter((otherNode) => node.frontmatter.authors.includes(otherNode.frontmatter.title))

      if (authorNodes.length > 0) {
        createNodeField({
          node,
          name: 'authors',
          value: authorNodes,
        })
      }
    }
  })

  const createPriceNode = (priceData) => {
    // eslint-disable-next-line no-console
    console.info(
      `The following values will be used for the price sections: \nOverage price: ${priceData.overagePrice}, Flat amount:  ${priceData.flatAmount}, Prepaid quantity:  ${priceData.prepaidQuantity}\n `
    )
    const nodeData = {
      ...priceData,
      id: 'api-price',
      parent: null,
      children: [],
      internal: {
        type: 'API_Price',
        contentDigest: createContentDigest({ priceData }),
      },
    }
    createNode(nodeData)
  }

  const defaultOveragePrice = process.env.GATSBY_DEFAULT_OVERAGE_PRICE ?? 0.2
  const defaultFlatAmount = process.env.GATSBY_DEFAULT_FLAT_AMOUNT ?? 20000
  const defaultPrepaidQuantity = process.env.GATSBY_DEFAULT_PREPAID_QUANTITY ?? 100000

  const defaultPriceData = {
    // Node treats all environment variables as strings
    overagePrice: Number(defaultOveragePrice),
    flatAmount: Number(defaultFlatAmount),
    prepaidQuantity: Number(defaultPrepaidQuantity),
  }

  const apiUrl =
    process.env.CONTEXT === 'production'
      ? process.env.GATSBY_FPJS_MGMT_API_HOST
      : process.env.GATSBY_PREVIEW_FPJS_MGMT_API_HOST

  if (apiUrl) {
    const result = await fetch(`${apiUrl}/prices?${new URLSearchParams({ 'product[]': 'api' })}`, {
      headers: {
        [process.env.GATSBY_CUSTOM_HEADER_WAF]: true,
      },
    })
    if (!result.ok) {
      // eslint-disable-next-line no-console
      console.error('An error has occurred getting price values from the endpoint. Default values will be used.')
      createPriceNode(defaultPriceData)
      return
    }
    const resultData = await result.json()
    createPriceNode({
      overagePrice: resultData.data.api.overagePrice ?? defaultOveragePrice,
      flatAmount: resultData.data.api.flatAmount ?? defaultFlatAmount,
      prepaidQuantity: resultData.data.api.prepaidQuantity ?? defaultPrepaidQuantity,
    })
  } else {
    // eslint-disable-next-line no-console
    console.error('The endpoint to get the prices is not defined. Default values will be used.')
    createPriceNode(defaultPriceData)
  }
}
exports.createSchemaCustomization = ({ actions }) => {
  // Define the @md tag to mark a field which should be interpreted as markdown and converted to HTML
  actions.createFieldExtension({
    name: 'md',
    extend() {
      return {
        resolve(source, args, context, info) {
          const fieldValue = context.defaultFieldResolver(source, args, context, info)
          return remark().use(remarkHTML).processSync(fieldValue).toString()
        },
      }
    },
  })
  actions.createTypes(`
    type MarkdownRemarkFrontmatter {
      header: Header
      summary: Summary
      cardSection: CardSection
      inlineCta: InlineCta
      bio: String @md
    }
    type Header{
      content: String @md
    }
    type Summary{
      results: [Results]
    }
    type Results implements Node{
      content: String @md
    }
    type CardSection{
      cards: [Cards]
      blocks: [Blocks]
    }
    type Cards implements Node{
      content: String @md
    }
    type Blocks implements Node{
      content: String @md
    }
    type InlineCta{
      subtitle: String @md
    }
    type NotificationBarYaml implements Node {
      barBody: String @md
    }
    type SitePage implements Node {
      context: SitePageContext
    }
    type SitePageContext {
      noIndex: Boolean
    }
    type MarkdownRemark implements Node {
      socialCard: File @link(from: "fields.socialCardId")
    }
`)
}
