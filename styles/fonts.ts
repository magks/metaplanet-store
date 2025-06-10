import {
  Inter,
  Roboto_Mono
} from 'next/font/google';


import {
  IBM_Plex_Mono,
  Orbitron,
  Space_Grotesk,
  VT323
} from 'next/font/google';

export const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
  display: 'swap',
});

 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: 'variable'
})
 
export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: 'variable'
})

