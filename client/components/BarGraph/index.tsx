import { FC } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { ApiResultType } from '@/type'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  pageList: ApiResultType[]
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '推移グラフ',
    }
  }
}

const now = new Date()
const monthNow = now.getMonth() + 1
const today = now.getDate()
const labels = [`${monthNow}月${today}日`]

const index: FC<Props> = ({pageList}): JSX.Element => {

  const testData = [
    {id: 1, label:'', data: pageList.map((page) => (page.score)), backgroundColor: 'rgba(105, 105, 105, 0.5)',},
  ]

  const data = {
    labels,
    datasets: testData,
  }

  return (
    <div>
      {/* <Bar datasetIdKey='id' options={options} data={data} /> */}
      <Line datasetIdKey='id' options={options} data={data} />
    </div>
  )
}

export default index


// app.post('/api/scores', (req, res) => {
//   const db = require('./db');
//   const { label, score } = req.body;
  
//   db.query(
//     'INSERT INTO scores (label, score) VALUES (?, ?)',
//     [label, score],
//     (err, results) => {
//       if (err) throw err;
//       res.send({
//         msg: 'Score saved!'
//       });
//     }
//   );
// });