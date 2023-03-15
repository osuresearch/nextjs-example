import Head from 'next/head'
import useSWR from 'swr'
import { Box, ExternalLink, Group, Heading, Stack, Text } from '@osuresearch/ui'
import { OhioStateAppShell } from '@/components/OhioStateAppShell'
import links from '../nav';

const fetcher = (query: string) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data)

type Data = {
  users: {
    name: string
  }[]
}

function GraphQLTest() {
  const { data, error, isLoading } = useSWR<Data>('{ users { name } }', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>no data</div>

  const { users } = data

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  )
}

export default function GraphQLDemo() {
  return (
    <OhioStateAppShell links={links}>
      <Head>
        <title>GraphQL - Demo App</title>
      </Head>

      <Stack>
        <Heading level={1}>GraphQL</Heading>
        <Text>
          Like using GraphQL for your apps? So do we.
          Here's some examples of our app working with GraphQL services,
          both through Next.js and directly from
          the <ExternalLink href="https://api.eip.osu.edu/store/apis/info?name=Research">Research API</ExternalLink>.
        </Text>
        <Text>
          Want to play with the built-in GraphiQL
          instance? <ExternalLink href="/api/graphql">Check it out</ExternalLink>
        </Text>
      </Stack>
    </OhioStateAppShell>
  )
}
