import { unstable_setRequestLocale } from 'next-intl/server';

import LandingPageContent from '@/templates/LandingPageContent';

export async function generateMetadata(_props: { params: { locale: string } }) {
  // Keeping the metadata as is for now, but user might want to update it later.
  return {
    title: 'Bindrix - One Smart Inbox for All Your Social Conversations',
    description: 'Bindrix unifies messages, comments, scheduling, analytics, and automates replies with intelligent, inventory-aware AI.',
  };
}

const IndexPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <LandingPageContent />
  );
};

export default IndexPage;
