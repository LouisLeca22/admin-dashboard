import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  query,
  collection,
  where,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';

const List = ({ user, product }) => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);

  const u = useRef(user).current;
  const p = useRef(product).current;

  useEffect(() => {
    let ref = query(collection(db, 'orders'), limit(10));

    if (u) {
      ref = query(ref, where(...u), limit(10));
    }

    if(p){
      ref = query(ref, where(...p), limit(10));
    }

    const unsub = onSnapshot(
      ref,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [u, p]);

  const { i18n, t } = useTranslation(['table']);

  useEffect(() => {
    setRows(
      data.map((row) => {
        let newMethod;
        let newStatus;
        switch (row.method) {
          case 'online':
            newMethod = t('online');
            break;
          case 'cash':
            newMethod = t('cash');
            break;
          default:
            newMethod = row.method;
        }

        switch (row.status) {
          case 'approved':
            newStatus = t('approved');
            break;
          case 'pending':
            newStatus = t('pending');
            break;
          default:
            newStatus = row.status;
        }

        return { ...row, method: newMethod, statusName: newStatus };
      })
    );
  }, [i18n, t, data]);

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>{t('colId')}</TableCell>
            <TableCell className='tableCell'>{t('colProduct')}</TableCell>
            <TableCell className='tableCell'>{t('colCostumer')}</TableCell>
            <TableCell className='tableCell'>{t('colDate')}</TableCell>
            <TableCell className='tableCell'>{t('colAmount')}</TableCell>
            <TableCell className='tableCell'>{t('colMethod')}</TableCell>
            <TableCell className='tableCell'>{t('colStatus')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='tableCell'>{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>{row.product}</div>
              </TableCell>
              <TableCell className='tableCell'>{row.client}</TableCell>
              <TableCell className='tableCell'>{`${row.timeStamp
                .toDate()
                .getDate()}/${row.timeStamp.toDate().getMonth()}/${row.timeStamp
                .toDate()
                .getFullYear()}`}</TableCell>
              <TableCell className='tableCell'>{row.amount}</TableCell>
              <TableCell className='tableCell'>{row.method}</TableCell>
              <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>{row.statusName}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
