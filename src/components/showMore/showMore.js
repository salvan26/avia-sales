/* eslint-disable prettier/prettier */ /* eslint-disable linebreak-style */
import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import * as reducers from '../../redux/reducers/tiket-reducer';

import classes from './showMore.module.scss';

const ShowMore = () => {
  const dispatch = useDispatch();
  const arrayTickets = useSelector((state) => state.tickets.arrayTickets);

  const handleButton = () => {
    dispatch(reducers.sliceTickets());
  };
  return (
    <div className={classes.button__container}>
      {arrayTickets.length > 0 ? (
        <Button type="primary" className={classes.app__button} size="large" onClick={handleButton}>
          показать ещё 5 билетов!
        </Button>
      ) : null}
    </div>
  );
};
export default ShowMore;
