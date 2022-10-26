import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { StyledForm, StyledFormButton } from './ContactsForm.styled';
import { useState } from 'react';

export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const formData = { name, number };

  function handleInputChange(e) {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        return;
    }
  }
  function reset() {
    setName('');
    setNumber('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
    reset();
  }

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>Name </label>
      <input
        id={nameInputId}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleInputChange}
        autoComplete="off"
      />

      <label htmlFor={numberInputId}>Number</label>
      <input
        id={numberInputId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleInputChange}
        autoComplete="off"
      />

      <StyledFormButton type="submit">Add contact</StyledFormButton>
    </StyledForm>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
