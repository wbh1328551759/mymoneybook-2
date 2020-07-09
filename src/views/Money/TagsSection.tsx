import styled from 'styled-components';
import React from 'react';
import {useTags} from 'hooks/useTags';


const Wrapper = styled.section`
  background: #FFFFFF;
  padding: 12px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  >ol{
    >li{
      background: #f5f5f5;
      color: #9A9A9A;
      border-radius: 18px;
      display: inline-block;
      padding: 0 20px;
      font-size: 14px;
      margin: 8px 12px;
      max-width: 140px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: bold;
      line-height: 30px;
      height: 30px;
      &.selected{
        background: #0ac675;
        color: white;
        font-weight: bold;
      }
    }
  }
  >button{
    background: none;
    border:none;
    padding: 2px 4px;
    border-bottom: 1px solid #333;
    color: #686c6f;
    margin-left: 12px;
    margin-top: 8px;
  }
`;

type Props = {
  value: number[],
  onChange: (value: number[]) => void
}

const TagsSection: React.FC<Props> = (props) => {
  const {tags, addTag} = useTags();
  const selectedTagIds = props.value;
  const onToggleTag = (tagId: number) => {
    const index = selectedTagIds.indexOf(tagId);
    if (index < 0) {
      props.onChange([...selectedTagIds, tagId]);
    } else {
      props.onChange(selectedTagIds.filter(t => t !== tagId));
    }
  };
  const getClass = (tagId: number) => selectedTagIds.indexOf(tagId) >= 0 ? 'selected' : '';
  return (
    <Wrapper>
      <ol>
        {tags.map(tag =>
          <li key={tag.id}
              onClick={() => onToggleTag(tag.id)}
              className={getClass(tag.id)}>
            {tag.name}
          </li>
        )}
      </ol>
      <button onClick={addTag}>新增标签</button>
    </Wrapper>
  );
};


export {TagsSection};