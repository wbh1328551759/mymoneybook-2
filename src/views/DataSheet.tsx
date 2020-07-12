import Layout from 'components/Layout';
import React, {useEffect, useRef, useState} from 'react';
import {RecordItem, useRecords} from '../hooks/useRecords';
import day from 'dayjs';
import {Center} from '../components/Center';
import {Button} from '../components/Button';
import {CategorySection} from './Money/CategorySection';
import {useUpdate} from '../hooks/useUpdate';
import styled from 'styled-components';

var echarts = require('echarts');

const ButtonWrapper = styled.div`
  margin-top: -50px;
`;
const Wrapper = styled.div`
  margin-top: 65px;
`;

const DataSheet = () => {
  const [category, setCategory] = useState<'-' | '+'>('-');
  const {records} = useRecords();
  const amountHash: { [K: string]: RecordItem[] } = {};
  const selectedRecords = records.filter(r => r.category === category);

  selectedRecords.forEach(r => {
    const key = day(r.createdAt).format('YYYY年MM月DD日');
    if (!(key in amountHash)) {
      amountHash[key] = [];
    }
    amountHash[key].push(r);
  });

  const array = Object.entries(amountHash).sort((a, b) => {
    if (a[0] === b[0]) return 0;
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  });

  let createdAtTable: string[] = [];
  let amountTable: number[] = [];
  useUpdate(() => {
      array.forEach((arr) => {
        const date = arr[0].slice(5, 7).concat('.' + arr[0].slice(8, 10));
        createdAtTable.push(date);
        amountTable.push(arr[1].reduce((sum, item) => sum + item.amount, 0));
      });
  },[records]);

  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<any>(null);
  const [option, setOption] = useState({
    title: {
      text:'近期支出/收入曲线图',
      left: 'center',
      align: 'right'
    },
    xAxis: {
      type: 'category',
      data: createdAtTable,
    },
    yAxis: [{
      type: 'value',
      name: '金额（元）',
      nameTextStyle: {
        fontSize: 13,
        fontWeight: 'bold'
      }
    }],
    series: [{
      data: [0],
      type: 'line',
      symbolSize: 13,
      itemStyle: {normal: {color: '#09c775', label: {show: false, textStyle: {fontSize: '15', color: '#7b7b7b'}}}},
      label: {
        fontSize: 19
      }
    }]
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (container.current) {
      container.current.style.maxWidth = '450px';
      container.current.style.height = '400px';
      container.current.style.margin = '30px';
      chart.current = echarts.init(container.current);
    }
  }, []);
  useEffect(() => {
    chart.current.setOption(option);
  }, [option]);
  useEffect(() => {
    if (loading) {
      chart.current.showLoading();
    } else {
      chart.current.hideLoading();
    }
  }, [loading]);
  const onClick = () => {
    if (loading) {return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOption({
        title: {
          text:'近期支出/收入曲线图',
          left: 'center',
          align: 'right'
        },
        xAxis: {
          type: 'category',
          data: createdAtTable,
        },
        yAxis: [{
          type: 'value',
          name: '金额（元）',
          nameTextStyle: {
            fontSize: 13,
            fontWeight: 'bold'
          }
        }],
        series: [{
          data: amountTable,
          type: 'line',
          symbolSize: 13,
          itemStyle: {normal: {color: '#09c775', label: {show: true, textStyle: {fontSize: '15', color: '#7b7b7b'}}}},
          label: {
            fontSize: 19
          }
        }]
      });
    }, 1000);
  };

  return (
    <Layout>
      <CategorySection value={category} onChange={value => setCategory(value)}/>
      <Wrapper>
        <div ref={container}/>
      </Wrapper>
      <Center>
        <ButtonWrapper>
          <Button onClick={onClick}>数据更新</Button>
        </ButtonWrapper>
      </Center>
    </Layout>
  );
};

export {DataSheet};