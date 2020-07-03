import styled from 'styled-components';
import React, {useRef, useState} from 'react';

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

const NoteSection: React.FC = () => {
  const [note,setNote] = useState('')
  const refInput = useRef<HTMLInputElement>(null)
  const onBlur = () => {
    if(refInput.current){
      setNote(refInput.current.value)
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