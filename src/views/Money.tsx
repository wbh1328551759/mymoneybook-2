import Layout from '../components/Layout';
import React from 'react';
import styled from 'styled-components';
import {NoteSection} from './Money/NoteSection';
import {TagsSection} from './Money/TagsSection';
import {NumberPadSection} from './Money/NumberPadSection';
import {CategorySection} from './Money/CategorySection';


const MyLayout = styled(Layout)`
  display:flex;
  flex-direction: column;
`;

function Money() {
  return (
    <MyLayout>
      <TagsSection/>
      <NoteSection/>
      <CategorySection />
      <NumberPadSection/>
    </MyLayout>
  );
}

export default Money;