import React from 'react';
import { Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import * as reducers from '../../redux/reducers/tiket-reducer';

import classes from './filter.module.scss';

const Filter = () => {
  const sortAll = useSelector((state) => state.tickets.sortAll);
  const sortWithout = useSelector((state) => state.tickets.sortWithout);
  const sortOne = useSelector((state) => state.tickets.sortOne);
  const sortTwo = useSelector((state) => state.tickets.sortTwo);
  const sortThree = useSelector((state) => state.tickets.sortThree);
  const dispatch = useDispatch();

  const handleSortAll = () => {
    dispatch(reducers.sortAll());
    dispatch(reducers.filtersTickets());
    dispatch(reducers.sortTickets());
  };
  const handleSortWithout = () => {
    dispatch(reducers.sortWithout());
    dispatch(reducers.filtersTickets());
    dispatch(reducers.sortTickets());
  };
  const handleSortrOne = () => {
    dispatch(reducers.sortOne());
    dispatch(reducers.filtersTickets());
    dispatch(reducers.sortTickets());
  };
  const handleSortTwo = () => {
    dispatch(reducers.sortTwo());
    dispatch(reducers.filtersTickets());
    dispatch(reducers.sortTickets());
  };
  const handleSortThree = () => {
    dispatch(reducers.sortThree());
    dispatch(reducers.filtersTickets());
    dispatch(reducers.sortTickets());
  };

  return (
    <section className={classes['app__sorting-elements']}>
      <p className={classes['app__sorting-header']}>Колличество пересадок</p>
      <section className={classes['app__sorting-header']}>
        <Checkbox onChange={handleSortAll} checked={sortAll || (sortWithout && sortOne && sortTwo && sortThree)}>
          Все
        </Checkbox>
        <Checkbox onChange={handleSortWithout} checked={sortWithout}>
          Без пересадок
        </Checkbox>
        <Checkbox onChange={handleSortrOne} checked={sortOne}>
          1 Пересадка
        </Checkbox>
        <Checkbox onChange={handleSortTwo} checked={sortTwo}>
          2 пересадки
        </Checkbox>
        <Checkbox onChange={handleSortThree} checked={sortThree}>
          3 пересадки
        </Checkbox>
      </section>
    </section>
  );
};

export default Filter;
