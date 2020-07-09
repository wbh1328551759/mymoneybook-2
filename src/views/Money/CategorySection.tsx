import styled from 'styled-components';
import React, {useState} from 'react';

const Wrapper = styled.section`
  font-size: 24px;
  >ul{
    display: flex;
    background: #09c775;
    color: #87ecbd;
    >li{  
      width: 50%;
      text-align: center;
      padding: 16px 0;
      position: relative;
      &.selected{
        color: white;
      }
      &.selected::after{
        content:'';
        display: block;
        height:3px;
        background: white;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
      }
    }
  }
`;

type Props = {
  value: '-' | '+'
  onChange: (value: '-' | '+') => void
}

const CategorySection: React.FC<Props> = (props) => {
  const categoryMap = {'-': '支出', '+': '收入'};
  const [categoryList] = useState<('-' | '+')[]>(['-', '+']);
  const category = props.value;
  return (
    <Wrapper>
      <ul>
        {
          categoryList.map(c =>
            <li className={category === c ? 'selected' : ''}
                onClick={() => props.onChange(c)}
                key={c}>
              {categoryMap[c]}
            </li>
          )
        }

      </ul>
    </Wrapper>
  );
};

export {CategorySection};