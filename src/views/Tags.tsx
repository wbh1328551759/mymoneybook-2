import Layout from '../components/Layout';
import React from 'react';
import {useTags} from 'useTags';
import styled from 'styled-components';
import Icon from '../components/icon';


const TagList = styled.ol`
  font-size: 16px;
  background: white;
  >li{
    border-bottom: 1px solid #d5d5d5;
    padding: 12px 0;
    margin: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Button = styled.button`
  font-size: 18px;
  border:none;
  padding: 8px 12px;
  background: #767676;
  color: white;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Space = styled.div`
  height: 16px;
`;

function Tags() {
  const {tags,setTags} = useTags()
  return (
    <Layout>
      <TagList>
        {tags.map(tag =>
            <li key={tag}>
              <span className="oneLine">{tag}</span>
              <Icon name="right"/>
            </li>
        )}
      </TagList>
      <Center>
        <Space/>
        <Space/>
        <Button>新增标签</Button>
      </Center>
    </Layout>
  );
}

export default Tags;