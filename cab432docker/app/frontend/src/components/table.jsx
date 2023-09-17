import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
  

const Table = (props) => {
    const [TABLE_HEAD, setTableHead] = useState([]);
    const [TABLE_ROWS, setTableRows] = useState([]);

    debugger;
    useEffect(() => {
        debugger;
        setTableHead(['Amount', 'Party', 'Sector', 'Senator', 'State', 'Date', 'Type']);
        setTableRows(props);
      }, []); 

  return (
    <Card className="h-full w-full">
         
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
    </Card>
  );
};
export default Table;