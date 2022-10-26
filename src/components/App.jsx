import React, { useState, useEffect, useRef } from 'react';
import { Section } from './Phonebook/Section';
import { ContactForm } from './Phonebook/ContactForm/ContactForm';
import { ContactsList } from './Phonebook/ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { Filter } from './Phonebook/Filter';
import { StyledApp } from './Phonebook/App.Styled';
export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const firstRender = useRef(true);
  useEffect(() => {
    const localStarageContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localStarageContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function deleteContacts(contactID) {
    setContacts(contacts.filter(contact => contact.id !== contactID));
  }
  function onFilter(e) {
    setFilter(e.currentTarget.value);
  }
  function formSubmitHandler(data) {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    } else {
      setContacts(contacts => [newContact, ...contacts]);
    }
  }

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <StyledApp>
      <Section title={'Phonebook'}>
        <ContactForm onSubmit={formSubmitHandler} />
      </Section>
      <Section title={'Contacts'}>
        <Filter onChange={onFilter} value={filter} />
        <ContactsList
          contacts={visibleContacts}
          deleteContact={deleteContacts}
        />
      </Section>
    </StyledApp>
  );
}

// style={{
//   height: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontSize: 40,
//   color: '#010101'
// }}
