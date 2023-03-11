import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { AnimatePresence } from 'framer-motion'


const theme = extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.size === 'xs' && {
            '--Icon-fontSize': '1rem',
            '--Button-gap': '0.25rem',
            minHeight: 'var(--Button-minHeight, 1.75rem)',
            fontSize: theme.vars.fontSize.xs,
            paddingBlock: '2px',
            paddingInline: '0.5rem',
          }),
          ...(ownerState.size === 'xl' && {
            '--Icon-fontSize': '2rem',
            '--Button-gap': '1rem',
            minHeight: 'var(--Button-minHeight, 4rem)',
            fontSize: theme.vars.fontSize.xl,
            paddingBlock: '0.5rem',
            paddingInline: '2rem',
          })
        }),
      },
    },
  },
});

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'UC Davis Course Search' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
  href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@400;700&display=swap"
  rel="stylesheet"
/>

    </Head>
    <header>
      <nav>
        {/* <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
        <Link href="/users">Users List</Link> |{' '}
        <a href="/api/users">Users API</a> */}
      </nav>
    </header>
    <CssVarsProvider  theme={theme}>
    <div class="mobile">
      <p>
        AggieWorks demo available via desktop.
        </p>
        </div>
    <div className="body">
    {children}
    </div>
    </CssVarsProvider>
    <footer>
      {/* <hr /> */}
      {/* <span>I'm here to stay (Footer)</span> */}
    </footer>
  </div>
)

export default Layout
