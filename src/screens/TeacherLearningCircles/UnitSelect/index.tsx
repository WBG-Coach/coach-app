import React from 'react';
import Page from '../../../components/Page';
import {useTranslation} from 'react-i18next';
import LoadingBar from '../LoadingBar';

const TLCUnitSelect: React.FC = () => {
  const {t} = useTranslation();
  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      <></>
    </Page>
  );
};

export default TLCUnitSelect;
