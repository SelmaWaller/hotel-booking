import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Establishments from './admin/Establishments';
import Enquiries from './admin/Enquiries';
import Messages from './admin/Messages';

export default function Admin() {
  if (!localStorage.getItem('token')) {
    return <Redirect to="/" />;
  }
  return (
    <Switch>
      <Route path="/admin/establishments" component={Establishments} />
      <Route path="/admin/enquiries" component={Enquiries} />
      <Route path="/admin/messages" component={Messages} />
      <Redirect to="/admin/establishments" />
    </Switch>
  );
}
