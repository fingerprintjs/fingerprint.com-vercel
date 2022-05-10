import type { GatsbyConfig } from 'gatsby'
import path from 'path'

const baseUrl = process.env.CONTEXT === 'deploy-preview' ? process.env.DEPLOY_PRIME_URL : 'https://fingerprintjs.com'

const resolvePath = (directoryName: string, pathName: string) => {
  const result = path.join(directoryName, pathName)
  if (process.platform === 'win32') {
    return result.replace(/\\/g, '\\\\')
  }

  return result
}

const gatsbyRequiredRules = path.join(process.cwd(), 'node_modules', 'gatsby', 'dist', 'utils', 'eslint-rules')

const rssPostQuery = `
{
  allMarkdownRemark(
    filter: {fields: {slug: {regex: "/blog/"}}, frontmatter: {isPublished: {ne: false}, isHidden: {ne: true}}}    sort: {order: DESC, fields: frontmatter___publishDate}
    limit: 15
  ) {
    edges {
      node {
        html
        fields {
          slug
        }
        frontmatter {
          title
          publishDate
          tags
          metadata {
            url
            description
            image {
              publicURL
            }
            socialImage {
              publicURL
            }
          }
        }
      }
    }
  }
}
`

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'FingerprintJS Pro - Device fingerprinting and fraud detection API',
    description: 'Stop fraud, spam, and account takeovers with 99.5% accurate device fingerprinting as a service.',
    siteUrl: baseUrl,
    image: 'https://fingerprintjs.com/img/fpjs-preview.png',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ['BRANCH', 'CONTEXT', 'DEPLOY_PRIME_URL'],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            edges {
              node {
                path
                pageContext
              }
            }
          }
        }
        `,
        resolvePages: ({ allSitePage: { edges: allPages } }) => allPages.map((page) => ({ ...page.node })),
        excludes: [],
        // eslint-disable-next-line consistent-return
        filterPages: (page) => {
          if (
            // Exclude pages marked with "noindex"
            page.pageContext.noIndex
          ) {
            return true
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
        additionalData: `@import "${resolvePath(path.resolve(), '/src/styles/common')}";`,
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false,
          },
        },
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(`static`),
        name: 'uploads',
        ignore: [`**/config.yml`],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(`content`),
        name: 'index',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(`src/img`),
        name: 'images',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: 'Table of Contents',
              tight: true,
              ordered: true,
              fromHeading: 1,
              toHeading: 2,
              className: 'contentTable',
            },
          },
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 766,
              linkImagesToOriginal: false,
              wrapperStyle: `max-height: 650px;`,
              disableBgImage: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: true,
            },
          },

          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              maintainCase: false,
              removeAccents: true,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              rel: 'noopener noreferrer',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        ref: true,
        svgoConfig: {
          plugins: [
            {
              name: 'cleanupIDs',
              active: false,
            },
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        rulePaths: [gatsbyRequiredRules],
        stages: ['develop'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules', 'bower_components', '.cache', 'public'],
      },
    },
    {
      resolve: 'gatsby-plugin-typegen',
      options: {
        outputPath: 'src/__generated__/gatsby-types.d.ts',
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: path.resolve(`src/cms/cms.js`),
      },
    },
    {
      resolve: 'gatsby-plugin-netlify', // make sure to keep it last in the array
      options: {
        mergeSecurityHeaders: false,
        headers: {
          '/*': [
            `X-Frame-Options: DENY`,
            `X-XSS-Protection: 1; mode=block`,
            `X-Content-Type-Options: nosniff`,
            `Referrer-Policy: no-referrer-when-downgrade`,
            `Cache-Control: public, max-age=900, s-maxage=900`,
          ],
        },
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.metadata.description,
                  date: edge.node.frontmatter.publishDate,
                  url: edge.node.frontmatter.metadata.url,
                  guid: edge.node.frontmatter.metadata.url,
                  enclosure: edge.node.frontmatter.metadata.socialImage
                    ? {
                        url: site.siteMetadata.siteUrl + edge.node.frontmatter.metadata.socialImage.publicURL,
                      }
                    : {
                        url: site.siteMetadata.siteUrl + edge.node.frontmatter.metadata.image.publicURL,
                      },
                  custom_elements: [
                    { 'content:encoded': edge.node.html },
                    { tags: edge.node.frontmatter.tags.join(', ') },
                  ],
                })
              })
            },
            query: rssPostQuery,
            output: '/rss.xml',
            title: 'FingerprintJS Blog RSS Feed',
          },
        ],
      },
    },
  ],
  mapping: {
    'MarkdownRemark.fields.author': 'MarkdownRemark[]',
  },
}

export default config
