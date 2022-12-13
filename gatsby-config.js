const path = require('path')

const baseUrl = process.env.VERCEL_ENV === 'preview' ? process.env.VERCEL_URL : 'https://fingerprint.com'

const resolvePath = (directoryName, pathName) => {
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
    filter: {fields: {slug: {regex: "/blog/"}}, frontmatter: {isPublished: {ne: false}, isHidden: {ne: true}}}
    sort: {order: DESC, fields: frontmatter___publishDate}
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

module.exports = {
  siteMetadata: {
    title: 'Fingerprint Pro - Formerly FingerprintJS - Device fingerprinting API',
    description:
      'Fingerprint Pro is the 99.5% accurate device fingerprinting solution. FingerprintJS is the top open-source browser fingerprinting library. Prevent fraud, spam, and account takeovers. Available for web, iOS, and Android.',
    siteUrl: baseUrl,
    image: 'https://fingerprint.com/img/fpjs-preview.png',
  },
  graphqlTypegen: {
    generateOnBuild: true,
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
        resolvePages: ({ allSitePage: { edges: allPages } }) =>
          allPages.map((page) => ({ ...page.node })).filter((page) => page.pageContext.noIndex !== true),
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
        additionalData: `@import "${resolvePath(__dirname, '/src/styles/common')}";`,
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
        path: `${__dirname}/static`,
        name: 'uploads',
        ignore: [`**/config.yml`],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/`,
        name: 'index',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-image',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`],
        },
      },
    },
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
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        ref: true,
        exclude: /\.inline\.svg$/,
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
    'gatsby-plugin-typescript',
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
            title: 'Fingerprint Blog RSS Feed',
          },
        ],
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
          ],
          '/*.html': ['cache-control: public, max-age=0, must-revalidate'],
          '/page-data/*': ['cache-control: public, max-age=0, must-revalidate'],
          '/static/*': ['cache-control: public, max-age=31536000, immutable'],
          '/**/*.js': ['cache-control: public, max-age=31536000, immutable'],
          '/**/*.css': ['cache-control: public, max-age=31536000, immutable'],
        },
      },
    },
  ],
  mapping: {
    'MarkdownRemark.fields.author': 'MarkdownRemark[]',
  },
}
