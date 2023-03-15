import { readFileSync } from 'node:fs'
import path from 'node:path'
import { createYoga, createSchema } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse } from 'next'
import { default as resolvers } from './resolvers'
import { default as typeDefs } from './typedefs'

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false
  }
}

// const typeDefs = readFileSync(path.join(__dirname, 'typedefs/index.gql'), 'utf8')

// D:\\Projects\\ORIS\\labeler\\.next\\server\\pages\\api\\typedefs\\index.gql
export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  graphqlEndpoint: '/api/graphql',

  // NOTE: This is just for Research API direct access
  // from any origin.
  // Not for apps, cuz security.
  cors: (request) => {
    // Explicit origin match instead of Access-Control-Allow-Origin: '*'
    const origin = request.headers.get('origin') || undefined;
    return {
      origin,
      credentials: true,
      allowedHeaders: ['X-Foo-Bar'],
      methods: ['POST']
    };
  },

  schema: createSchema({
    typeDefs,
    resolvers
  })
})
