import React = require('react');

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

type UserContextProviderProps = {
  children: React.ReactNode
};

const UserContext = createContext({});

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState({});

  const login = () => {
    // setUser(user);
    axios.get('/user')
      .then(({ data }: { data: object }) => {
        console.log(data);
        if (typeof data === 'object') {
          const curUser = { ...data };
          setUser(curUser);
        }
        // console.log(user);
      })
      .catch((err: Error) => console.error('failed setting user', err));
  };

  const logout = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContextProvider);
