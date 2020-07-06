import Layout from '../components/Layout';
import React, {useState} from 'react';
import styled from 'styled-components';
import {NoteSection} from './Money/NoteSection';
import {TagsSection} from './Money/TagsSection';
import {NumberPadSection} from './Money/NumberPadSection';
import {CategorySection} from './Money/CategorySection';
import {useRecords} from '../hooks/useRecords';
import {strict} from 'assert';


const MyLayout = styled(Layout)`
  display:flex;
  flex-direction: column;
`;

type Category = '-' | '+'

const defaultFormData = {
  tagIds: [] as number[],
  note: '',
  category: '-' as Category,
  amount: 0,
};

function Money() {
  const [selected, setSelected] = useState(defaultFormData);
  const onChange = (obj: Partial<typeof selected>) => {
    setSelected({
      ...selected,
      ...obj
    });
  };
  const {addRecord} = useRecords();
  const submit = () => {
    if(addRecord(selected)){
      window.alert('保存成功');
      setSelected(defaultFormData);
    }
  };
  return (
    <MyLayout>
      <TagsSection value={selected.tagIds}
                   onChange={tagIds => onChange({tagIds})}/>
      <NoteSection value={selected.note}
                   onChange={note => onChange({note})}/>
      <CategorySection value={selected.category}
                       onChange={category => onChange({category})}/>
      <NumberPadSection value={selected.amount}
                        onChange={amount => onChange({amount})}
                        onOk={submit}/>
    </MyLayout>
  );
}

export default Money;