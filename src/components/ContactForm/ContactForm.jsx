import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import Loader from '../Loader/Loader';

import styles from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const {
    items: contacts,
    loading,
    error,
  } = useSelector((state) => state.contacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Number
        <input
          className={styles.input}
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </label>

      <button className={styles.button} type="submit" disabled={loading}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
