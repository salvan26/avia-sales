/* eslint-disable prettier/prettier */ /* eslint-disable linebreak-style */

import React from 'react';

import Logo from '../logo';
import Filter from '../filter';
import Tabs from '../tabs';
import ShowMore from '../showMore';
import TicketList from '../tikets-list';

import classes from './App.module.scss';

const App = () => {
  return (
    <section className={classes.app}>
      <Logo />
      <div className={classes.app__main}>
        <section className={classes.app__sort}>
          <Filter />
        </section>
        <section className={classes.app__list}>
          <Tabs />
          <TicketList />
          <ShowMore />
        </section>
      </div>
    </section>
  );
};
export default App;
