import Layout from 'components/Layout';
import React, {ReactNode, useState} from 'react';
import {CategorySection} from './Money/CategorySection';
import styled from 'styled-components';
import {RecordItem, useRecords} from '../hooks/useRecords';
import {useTags} from 'hooks/useTags';
import day from 'dayjs';

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
  >.note{
    margin-right: auto;
    margin-left: 16px ;
    color: #999;
  }
`;

const Header = styled.h3`
  font-size: 20px;
  line-height: 20px;
  padding: 10px 10px;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
`;

function Statistics() {
  const [category, setCategory] = useState<'-' | '+'>('-');
  const {records} = useRecords();
  const {getName, findTag} = useTags();
  const hash: { [K: string]: RecordItem[] } = {};
  const selectedRecords = records.filter(r => r.category === category);

  selectedRecords.forEach(r => {
    const key = day(r.createdAt).format('YYYY年MM月DD日');
    if (!(key in hash)) {
      hash[key] = [];
    }
    hash[key].push(r);
  });

  const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) return 0;
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  });

  return (
    <Layout>
      <CategorySection value={category}
                       onChange={value => setCategory(value)}/>
      {array.map(([date, records]) =>
        <div key={date}>
          <Header>
            <span>{date}</span>
            <span>￥{records.reduce((sum, item) => sum + item.amount, 0)}</span>
          </Header>
          {records.map(record => {
            return <Item key={record.createdAt}>
              <div className="tag oneLine">
                {findTag(record.tagIds[0]) ?
                  record.tagIds.map(tagId => <span key={tagId}>{getName(tagId)}</span>)
                    .reduce((result, span, index, array) =>
                      result.concat(index < array.length - 1 ? [span, '、'] : [span]), [] as ReactNode[]) :
                  '该标签已被删除'
                }
              </div>
              {findTag(record.tagIds[0]) && record.note && <div className="note">：{record.note}</div>}
              <div className="amount">
                ￥{record.amount}
              </div>
            </Item>;
          })}
        </div>
      )}
    </Layout>
  );
}

export default Statistics;