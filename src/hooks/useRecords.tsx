import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';


export type RecordItem = {
  tagIds: number[],
  note: string,
  category: '-' | '+',
  amount: number,
  createdAt: string,
  name?: string
}
type newRecordItem = Omit<RecordItem, 'createdAt'>

export const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([{
    'tagIds': [1],
    'note': '',
    'category': '-',
    'amount': 250,
    'createdAt': '2020-07-11T17:22:05.427Z'
  }]);

  useEffect(() => {
    let localRecords = JSON.parse(window.localStorage.getItem('records') || '[]')
    if (localRecords.length === 0) {
      localRecords = [
        {
          'tagIds': [1],
          'note': '',
          'category': '-',
          'amount': 250,
          'createdAt': '2020-07-11T17:22:05.427Z'
        },
        {
          'tagIds': [2],
          'note': '',
          'category': '-',
          'amount': 35.5,
          'createdAt': '2020-07-10T17:22:05.427Z'
        },
        {
          'tagIds': [3,4],
          'note': '',
          'category': '-',
          'amount': 100,
          'createdAt': '2020-07-10T18:22:05.427Z'
        },
        {
          'tagIds': [3],
          'note': '',
          'category': '-',
          'amount': 100,
          'createdAt': '2020-07-08T17:22:05.427Z'
        },
        {
          'tagIds': [4],
          'note': '',
          'category': '-',
          'amount': 20,
          'createdAt': '2020-07-06T17:22:05.427Z'
        },

        {
          'tagIds': [1],
          'note': '',
          'category': '+',
          'amount': 68,
          'createdAt': '2020-07-11T17:22:05.427Z'
        },
        {
          'tagIds': [2],
          'note': '',
          'category': '+',
          'amount': 130,
          'createdAt': '2020-07-10T17:22:05.427Z'
        },
        {
          'tagIds': [3,4],
          'note': '',
          'category': '+',
          'amount': 271.5,
          'createdAt': '2020-07-15T18:22:05.427Z'
        },
      ];
    }
    setRecords(localRecords);
  }, []);
  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
  }, records);

  const addRecord = (newRecord: newRecordItem) => {
    if (newRecord.amount <= 0) {
      window.alert('请输入有效金额！');
      return false;
    }
    if (newRecord.tagIds.length === 0) {
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