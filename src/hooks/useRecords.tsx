import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';

type RecordItem = {
  tagIds: number[],
  note: string,
  category: '-' | '+',
  amount: number,
  createdAt: string
}
type newRecordItem = Omit<RecordItem, 'createdAt'>

export const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
  }, []);
  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  const addRecord = (newRecord: newRecordItem) => {
    if (newRecord.amount <= 0) {
      window.alert('请输入有效金额！');
      return false;
    }
    if(newRecord.tagIds.length === 0){
      window.alert('请选择对应的标签！');
      return false;
    }
    const record = {...newRecord, createdAt: (new Date()).toISOString()};
    setRecords([...records, record]);
    return true;
  };

  return {
    records: records,
    setRecords: setRecords,
    addRecord: addRecord
  };
};