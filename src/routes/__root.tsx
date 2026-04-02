import { Root } from '@/components/Root';
import type { MyRouterContext } from '@/router';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import appCss from '../styles.css?url';

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Estimato – Online Planning Poker & Agile Estimation Tool',
      },
      {
        name: 'description',
        content:
          'Estimato is a modern online Planning Poker app for Scrum and agile teams. Estimate story points, vote collaboratively, and reveal results in real time. Perfect for remote sprint planning.',
      },
      {
        name: 'keywords',
        content:
          'planning poker, online estimation, agile estimation tool, scrum poker, story point estimation, remote sprint planning, collaborative voting, real-time results',
      },
      {
        name: 'author',
        content: 'Akash Pradhan',
      },
      {
        name: 'author_website',
        content: 'https://dev2akash.vercel.app/',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  component: Root,
  ssr: false,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
