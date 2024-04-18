import React = require('react');

import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Profile from './Profile';
import Buddy from './Buddy';
import ChatBot from './ChatBot';
import Events from './Events';
import Event from './EventsComponents/Event';
import Resources from './Resources';
import { Container, Box, ChakraProvider } from '@chakra-ui/react';
import Login from './Login';
import { UserContextProvider } from '../context/UserContext';
import BuddyChat from './buddyChildren/BuddyChat';

function App() {
  // refactored so i can also exclude my path as well for styling purposes
  const location = useLocation();
  const showNavbar =
    location.pathname !== '/' && location.pathname !== '/buddychat';

  return (
    <UserContextProvider>
      <ChakraProvider>
        <Container
          maxW="7xl"
          bg="blue.200"
          marginTop={'25px'}
          marginBottom={'15px'}
          h={'250px'}
        >
          {useLocation().pathname === '/' ? <div /> : <Navbar />}
        </Container>
      </ChakraProvider>

      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buddy" element={<Buddy />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/buddychat/:room" element={<BuddyChat />} />
        <Route path="/events/:id" element={<Event />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
