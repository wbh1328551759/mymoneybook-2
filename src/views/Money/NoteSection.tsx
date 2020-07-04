import styled from 'styled-components';
import React, {useRef} from 'react';

const Wrapper = styled.section`
  background: #f5f5f5;
  padding: 0 28px;
  font-size: 14px;
  >label{
    display: flex;
    align-items: center;
    >span{ 
      margin-right: 16px;
      white-space: nowrap;
    }
    >input{
      display: block;
      width: 100%;
      line-height: 72px;
      border:none;
      background: none;
    }
  }
`;

type Props = {
  value: string,
  onChange: (value: string) => void
}

const NoteSection: React.FC<Props> = (props) => {
  const note = props.value
  const refInput = useRef<HTMLInputElement>(null)
  const onBlur = () => {
    if(refInput.current){
      props.onChange(refInput.current.value)
    }
  }
  return(
    <Wrapper>
      <label>
          <span>
            备注：
          </span>
        <input type="text"
               placeholder="请在这里输入备注"
               defaultValue={note}
               ref={refInput}
               onBlur={onBlur} />
      </label>
    </Wrapper>
  )
}
export {NoteSection}