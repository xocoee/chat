import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { io } from 'socket.io-client';

import store from '../store';
import Error from './pages/Error.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Header from './uiComponents/Header.jsx';
import PrivateRoute from './uiComponents/PrivateRoute.jsx';

import routes from '../utils/routes.js';
import i18n from '../i18next/i18next.js';
import rollbarConfig from '../rollbar/rollbarConfig.js';
import { channelsApi } from '../store/channelsApi.js';
import { messagesApi } from '../store/messagesApi.js';
import {
  getCurrentActiveChannel,
  getCurrentDefaultChannel,
  setActiveChannel,
} from '../store/uiSlice.js';

const App = () => {
  const socket = io();

  const listenerAddChannel = (event) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      draft.push(event);
    }));
  };

  const listenerDeleteChannel = (event) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const index = draft.findIndex((item) => item.id === event.id);
      if (index !== -1) { draft.splice(index, 1); }
      const activeChannel = getCurrentActiveChannel(store.getState());
      if (event.id === activeChannel.id) {
        const defaultChannel = getCurrentDefaultChannel(store.getState());
        store.dispatch(setActiveChannel(defaultChannel));
      }
    }));
  };

  const listenerEditChannel = (event) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const channel = draft.find((item) => item.id === event.id);
      channel.name = event.name;
      if (channel) { channel.name = event.name; }
    }));
  };

  const listenerNewMessage = (event) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
      draft.push(event);
    }));
  };

  socket.on('newChannel', listenerAddChannel);
  socket.on('removeChannel', listenerDeleteChannel);
  socket.on('renameChannel', listenerEditChannel);
  socket.on('newMessage', listenerNewMessage);

  const ruDict = filter.getDictionary('ru');
  filter.add(ruDict);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <I18nextProvider i18n={i18n}>
            <BrowserRouter>
              <div className="d-flex flex-column h-100">
                <Routes>
                  <Route path={routes.root()} element={<Header />}>
                    <Route
                      index
                      element={(
                        <PrivateRoute>
                          <Home />
                        </PrivateRoute>
                      )}
                    />
                    <Route path={routes.loginPage()} element={<Login />} />
                    <Route path={routes.signupPage()} element={<Signup />} />
                    <Route path={routes.notFoundPage()} element={<Error />} />
                  </Route>
                </Routes>
              </div>
            </BrowserRouter>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </I18nextProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
