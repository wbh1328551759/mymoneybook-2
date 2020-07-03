import styled from 'styled-components';
import React, {useState} from 'react';


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
      background: #D9D9D9;
      border-radius: 18px;
      display: inline-block;
      padding: 3px 15px;
      font-size: 14px;
      margin: 8px 12px;
      &.selected{
        background: red;
      }
    }
  }
  >button{
    background: none;
    border:none;
    padding: 2px 4px;
    border-bottom: 1px solid #333;
    color: #666;
    margin-left: 12px;
    margin-top: 8px;
  }
`;


const TagsSection: React.FC = (props) => {
  const [tags, setTags] = useState<string[]>(['衣', '食', '住', '行']);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const onAddTags = () => {
    const tagName = window.prompt('请输入标签名：');
    if (tagName !== null) {
      setTags([...tags, tagName]);
    } else {
    }
  };
  const onToggleTag = (tag: string) => {
    const index = selectedTags.indexOf(tag);
    if (index < 0) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    }
  };
  const getClass = (tag: string) => selectedTags.indexOf(tag) >= 0 ? 'selected' : '';
  return (
    <Wrapper>
      <ol>
        {tags.map(tag =>
          <li key={tag}
              onClick={() => onToggleTag(tag)}
              className={getClass(tag)}>
            {tag}
          </li>
        )}
      </ol>
      <button onClick={onAddTags}>新增标签</button>
    </Wrapper>
  );
};


export {TagsSection};