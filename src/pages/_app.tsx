import { RUIProvider } from '@osuresearch/ui'
import { AppProps } from 'next/app'

import '@osuresearch/ui/dist/index.css';
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RUIProvider theme="dark">
      <Component {...pageProps} />
    </RUIProvider>
  );
}
