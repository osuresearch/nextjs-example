import { GraphQLError, GraphQLResolveInfo } from 'graphql'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface QueryPersonArgs {
  id: string
}

interface ContextValue {
  req: NextApiRequest
  res: NextApiResponse<any>
}

const resolvers = {
  Query: {
    greetings: () => 'This is a greeting',

    // This example uses axios to talk to our upstream REST API
    person: async (
      // Full set of arguments you can use.
      parent: any,
      args: QueryPersonArgs,
      contextValue: ContextValue,
      info: GraphQLResolveInfo
    ) => {
      try {
        const user = await axios.get(
          `https://orapps.osu.edu/api/v1/person/${args.id}`
        );

        if ('errors' in user.data) {
          throw new GraphQLError('Upstream API error: ' + user.data.errors[0].title);
        }

        const attr = user.data.data.attributes;

        return {
          id: user.data.id,
          name: `${attr.firstName} ${attr.lastName}`,
          username: attr.username,
          email: attr.email
        };

      } catch (error) {
        // Do something. Sanitize error and all that.
        throw error;
      }
    },

    // This example talks to our upstream GraphQL API
    person2: async (_: any, args: QueryPersonArgs) => {
      try {
        // I already have axios installed for the REST API.
        // If you're just using GQL upstream, use a GQL client.
        const data = await axios({
          url: 'https://orapps.osu.edu/api/graphql',
          method: 'post',
          data: {
            query: /* GraphQL */`
              query {
                people(ids: "200275154") {
                  id
                  name
                  username
                  email
                }
              }
            `
          }
        });

        // Yes. This is awkward. I know.
        if (data.data.data.people) {
          return data.data.data.people[0];
        }

        throw new GraphQLError(
          'Got unexpected response from the upstream API'
        );
      } catch (error) {
        // Do something. Sanitize error and all that.
        throw error;
      }
    },
  },

  Mutation: {
    // For configuring uploads, see:
    // https://the-guild.dev/graphql/yoga-server/docs/features/file-uploads
    upload: async (_: any, { file }: { file: File }) => {
      const textContent = await file.text();
      return textContent;
    }
  }
}

export default resolvers;
