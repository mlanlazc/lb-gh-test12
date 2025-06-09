import { useLoaderData, redirect } from '@remix-run/react';
import { ErrorComponent } from '@/components/building-blocks/error-component/error-component';
import OutletsPage, { loader as outletsLoader } from './outlets';

export async function loader() {
  // Redirect to the outlets page as the new homepage
  return redirect('/outlets');
}

export default function Index() {
  // This component will technically not be rendered due to the redirect in loader,
  // but it's kept for Remix's routing structure.
  // If direct access were possible, it would render the OutletsPage.
  const data = useLoaderData<typeof outletsLoader>();

  if ('error' in data) {
    return <ErrorComponent errorMessage={data.error} />;
  }

  return <OutletsPage {...data} />;
}
