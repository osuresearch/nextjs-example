import Head from 'next/head'
import useSWR from 'swr'
import { Box, Group, Heading, Stack, Text } from '@osuresearch/ui'
import { OhioStateAppShell } from '@/components/OhioStateAppShell'
import links from '../nav';

export default function RippleDemo() {
  return (
    <OhioStateAppShell links={links}>
      <Head>
        <title>Ripple - Demo App</title>
      </Head>

      <Stack>
        <Heading level={1}>Ripple - The Google Docs of Smart Forms</Heading>

      </Stack>
    </OhioStateAppShell>
  )
}