/* eslint-disable linebreak-style */ /* eslint-disable prettier/prettier */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import Ticket from '../tiket/Tiket';
import * as reducers from '../../redux/reducers/tiket-reducer';

import classes from './TiketsList.module.scss';

const TicketList = () => {
  let ticketList = [];
  const sliceNumber = useSelector((state) => state.tickets.sliceNumber);
  const sortAll = useSelector((state) => state.tickets.sortAll);
  const sortWithout = useSelector((state) => state.tickets.sortWithout);
  const sortOne = useSelector((state) => state.tickets.sortOne);
  const sortTwo = useSelector((state) => state.tickets.sortTwo);
  const sortThree = useSelector((state) => state.tickets.sortThree);
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickes);
  const stop = useSelector((state) => state.tickets.stop);
  const { searchId } = useSelector((state) => state.searchId);
  const arrayTickets = useSelector((state) => state.tickets.arrayTickets);
  useEffect(() => {
    dispatch(reducers.fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(reducers.fetchTicketsThunk(searchId));
      dispatch(reducers.filtersTickets());
      dispatch(reducers.sortTickets());
      dispatch(reducers.sliceTickets(sliceNumber || 5));
    }
  }, [searchId, tickets, dispatch, stop, sliceNumber]);

  useEffect(() => {
    dispatch(reducers.ticketsSlice.actions.sliceTickets(sliceNumber || 5));
  }, [sortAll, sortWithout, sortOne, sortTwo, sortThree, dispatch, sliceNumber]);
  if (arrayTickets.length > 0) {
    ticketList = arrayTickets.map((ticket) => {
      return <Ticket ticket={ticket} key={nanoid()} />;
    });
  }
  return (
    <div>
      {arrayTickets.length > 0 ? (
        ticketList
      ) : (
        <div className={classes.empty__container}>По вашему запросу ничего не найдено</div>
      )}
    </div>
  );
};

export default TicketList;
