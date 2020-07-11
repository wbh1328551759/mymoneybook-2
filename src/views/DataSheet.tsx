import Layout from 'components/Layout';
import React, {useEffect, useRef, useState} from 'react';
import {RecordItem, useRecords} from '../hooks/useRecords';
import day from 'dayjs';
var echarts = require('echarts');

const DataSheet = () => {
  const [category] = useState<'-' | '+'>('-');
  const {records} = useRecords();
  const hash: { [K: string]: RecordItem[] } = {};
  const selectedRecords = records.filter(r => r.category === category);

  selectedRecords.map(r => {
    const key = day(r.createdAt).format('YYYY年MM月DD日');
    if (!(key in hash)) {
      hash[key] = [];
    }
    return hash[key].push(r);
  });

  const count = useRef(0)
  useEffect(()=>{
    count.current += 1
  })

  let data: string[] = []
  useEffect(()=>{
    if(count.current > 1){
      Object.keys(hash).map((a)=>{
        data.push(a)
      })
      console.log(data);
    }
  })




  const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) return 0;
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  });

  // for(let x in hash){
  //   dateArray.push(x)
  // }



  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<any>(null);
  const [option, setOption] = useState({
    xAxis: {
      type: 'category',
      data: data
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  })
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    if (container.current) {
      container.current.style.maxWidth = '500px';
      container.current.style.height = '400px';
      container.current.style.margin = 'auto 50px'
      chart.current = echarts.init(container.current);
    }
  }, []);
  useEffect(() => {
      chart.current.setOption(option);
  }, [option]);

  useEffect(()=>{
    if(loading){
      chart.current.showLoading()
    }else{
      chart.current.hideLoading()
    }
  },[loading])
  const onClick = () => {
    if(loading) {return }
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      setOption({
        xAxis: {
          type: 'category',
          data: data
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [1,2,3],
          type: 'line'
        }]
      })
    },1000)

  }
  return (
    <Layout>
      <div ref={container} />
      <button onClick={onClick}>刷新</button>
    </Layout>
  );
};

export {DataSheet};