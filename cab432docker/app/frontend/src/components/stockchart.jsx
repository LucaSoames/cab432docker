import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Label,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Table from './table.jsx';
//alpha vat

const StockChart = () => {
  const [TABLE_HEAD, setTableHead] = useState([]);
  const [TABLE_ROWS, setTableRows] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState({});
  const [stockData, setStockData] = useState({});
  const [senateTrades, setSenateTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
// const data = [{name: 'Page A', price: 400, pv: 2400, amt: 2400}, {name: 'Page B', price: 600, pv: 2400, amt: 2400},];

const fetchData = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(`http://localhost:3001/search/${symbol}`);
        const data = response.data;
      // Check if data is an array before using map
        // Create chart data
        debugger;
        setData(data.dataArray);
        setStockData(data.metaData);
        setSenateTrades(data.tickerTransactions);
        setTableHead(['Amount', 'Party', 'Sector', 'Senator', 'State', 'Date', 'Type']);
        setTableRows(senateTrades);
   
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Stock Symbol"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
        />
        <button onClick={() => fetchData()}>Search</button>
      </div>
      <Card className="mt-6 w-96">
        <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {stockData.Symbol}
        </Typography>
          <div>
              <LineChart width={600} height={300} data={data}>
                <Line dataKey="price" 
                fill="#ccc"
                fillOpacity={0}
                dot={false}
                />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis dataKey="price" label={{ value: 'Price $US', angle: -90, position: 'insideLeft' }}/>
                <Tooltip />
            </LineChart>
          </div>
        </CardBody>
        <div>
          <CardBody>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head) => (
                        <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        >
                        {head}
                        </Typography>
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {TABLE_ROWS.map(({ amount, party, sector, senator, state, date, type }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    
                    return (
                        <tr key={amount}>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {amount}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {party}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {sector}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                        >
                            {senator}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                            >
                            {state}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                            >
                            {date}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                            >
                            {type}
                        </Typography>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

export default StockChart;
