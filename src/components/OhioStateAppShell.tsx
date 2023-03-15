import { Box, Group, OhioStateFooter, OhioStateNavbar, Text, useTheme, Link as RUILink, Grid, Stack, VisuallyHidden } from "@osuresearch/ui"
import Link, { LinkProps } from 'next/link'
import { useRouter } from "next/router"
import styled from 'styled-components'
import { ToggleThemeButton } from "./ToggleThemeButton"

// import styles from './OhioStateAppShell.module.css';

export type OhioStateAppShellProps = {
  aside?: React.ReactNode

  links?: {
    title: string
    href: string
  }[]

  menu?: React.ReactNode
  children: React.ReactNode
}

const GlassNavbar = styled.nav`
  backdrop-filter: saturate(180%) blur(5px);

  /* TODO: Really do need RUI RGB tokens so I can do HSL magic. */
  background: ${(props) => props.theme.theme === 'light'
    ? 'rgba(255, 255, 255, .8)'
    : 'rgba(20, 21, 23, .8)'};

  z-index: 999;

  border-bottom: 1px solid var(--rui-light-shade);

  grid-area: header;
  position: sticky;
  top: 0;
`;

// Interesting issue: hard reload in the browser doesn't load this style correctly.
// Only after a hot reload will it.
const Content = styled.main`
  grid-area: content;
  min-width: 30rem;
  justify-self: center;
  padding: var(--rui-spacing-md);
`;

/**
 * Component that will eventually go into RUI for OSU.
 */
export function OhioStateAppShell({ children, links, menu, aside }: OhioStateAppShellProps) {
  const { theme } = useTheme();
  const router = useRouter();

  // Your basic responsive holy grail layout
  return (
    <Grid
      areas={{
        md: [
          'header header  header',
          'menu   content aside',
          'footer footer  footer',
        ],
        // NOTE: RUI bug causes sm styles to be applied on large screens
        sm: [
          'header',
          'menu',
          'content',
          'aside',
          'footer'
        ]
      }}
      columns={{
        md: ['10rem', 'auto', '10rem'],
        sm: ['auto']
      }}
      gap="sm"
      rows={{
        md: ['auto', '1fr', 'auto'],
        sm: ['auto', '1fr', 'auto']
      }}
      mih="100vh"
    >
      <Box gridArea="header">
        <VisuallyHidden>
          <a id="skip" href="#content">Skip to main content</a>
        </VisuallyHidden>

        <header>
          {/* TODO: This has compatibility issues with Next.js */}
          {/* <OhioStateNavbar variant="dark" /> */}
        </header>
      </Box>

      {/* Basic navbar things. I need a nice version in RUI. */}
      <GlassNavbar theme={{ theme }}>
        <Group justify="apart" align="center">
          <Group px="lg" py="md" gap="lg">
            <Link href="/" passHref legacyBehavior>
              <RUILink>My Cool App</RUILink>
            </Link>

            {links &&
            <Group as="ul">
              {/* TODO: I'd prefer a navlink component instead of base RUI links. Esp so I can animate */}
              {links.map((link) =>
                <li key={link.href}>
                  <Link href={link.href} passHref legacyBehavior>
                    <RUILink
                      className={router.pathname == link.href ? 'rui-shadow-underline-primary' : ''}
                    >{link.title}</RUILink>
                  </Link>
                </li>
              )}
              </Group>
            }
          </Group>

          <ToggleThemeButton />
        </Group>
      </GlassNavbar>

      <Box as="nav" gridArea="menu" px="lg">
        {menu}
      </Box>

      {/* Content uses a styled component to make no assumption about
          inner content layout or styling  */}
      <Content id="#content">
        {children}
      </Content>

      <Box as="aside" gridArea="aside">
        {aside}
      </Box>

      <Box as="div" gridArea="footer">
        <OhioStateFooter
          accessibilityEmail="oraccessibility@osu.edu"
        />
        {/* <Stack bgc="light" align="end" p="xs">
          <ToggleThemeButton />
        </Stack> */}
      </Box>
    </Grid>
  )
}
