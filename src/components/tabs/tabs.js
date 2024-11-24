/* eslint-disable prettier/prettier */ /* eslint-disable linebreak-style */

import React from 'react';
import { Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import * as reducers from '../../redux/reducers/tiket-reducer';

import classes from './tabs.module.scss';

const options = [
  {
    label: 'САМЫЙ ДЕШЁВЫЙ',
    value: 'САМЫЙ ДЕШЁВЫЙ',
  },
  {
    label: 'САМЫЙ БЫСТРЫЙ',
    value: 'САМЫЙ БЫСТРЫЙ',
  },
];
const Tabs = () => {
  const dispatch = useDispatch();
  const sliceNumber = useSelector((state) => state.tickets.sliceNumber);
  const isLoading = useSelector((state) => state.tickets.isLoading);
  const onChangeFilter = ({ target: { value } }) => {
    if (value === 'САМЫЙ ДЕШЁВЫЙ') {
      dispatch(reducers.sortCheap());
      dispatch(reducers.filtersTickets());
      dispatch(reducers.sortTickets());
      dispatch(reducers.sliceTickets(sliceNumber || 5));
    } else if (value === 'САМЫЙ БЫСТРЫЙ') {
      dispatch(reducers.sortFast());
      dispatch(reducers.filtersTickets());
      dispatch(reducers.sortTickets());
      dispatch(reducers.sliceTickets(sliceNumber || 5));
    }
  };
  return (
    <div className={classes.app__filter}>
      <Radio.Group
        block
        options={options}
        defaultValue="САМЫЙ ДЕШЁВЫЙ"
        optionType="button"
        buttonStyle="solid"
        onChange={onChangeFilter}
      />
      {isLoading ? (
        <div>
          <span className={classes.loader} />
          <p className={classes.info}>Search tickets...</p>
        </div>
      ) : null}
    </div>
  );
};
export default Tabs;
