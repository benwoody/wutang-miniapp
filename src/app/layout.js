import { sdk } from '@farcaster/frame-sdk'
console.log(sdk)
await sdk.actions.ready();

export const metadata = {
  title: "Wu-Tang Name Generator",
  description: "Generate your Wu-Tang name",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="fc:frame" content="vNext" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}