import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  stacked: false,
  maintainAspectRatio:false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'نمودار قیمت',
    },
  },
  scales:{
    y: {
      ticks: {
          // Include a dollar sign in the ticks
          callback: function(value:any) {
              return value + "میلیارد";
          }
      }
  }
  }
};



const Chart1:React.FC<{data:any[]}> = ({data})=> {
  var labels:any[] = [];
  data.forEach((item)=>{
    labels.push(item['periodSymbol'])
  })
  const xxx = {
    labels,
    datasets: [
      {
        label: 'قیمت',
        data: labels.map((item,index) => data[index]['value']/1000000000),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return <Line options={options} data={xxx} />;
}

export default Chart1;