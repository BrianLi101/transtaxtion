import { Header } from 'src/components/header';

import { SearchBar } from 'src/components/header/SearchBar';
import { PageColumn } from 'src/components/general';

import { Page } from '../styled';

import { HomePageBody } from './styled';

export const HomePage = () => {
  return (
    <Page>
      <Header hideSearchBar />
      <HomePageBody>
        <PageColumn>
          <SearchBar />
        </PageColumn>
      </HomePageBody>
    </Page>
  );
};
