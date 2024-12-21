import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import { selectFilteredContacts } from './redux/contactsSlice';
import './App.css';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import Loader from './components/Loader/Loader';

function App() {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.contacts);
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      {contacts.length > 0 && <Filter />}
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {contacts.length > 0 ? <ContactList /> : <p>No contacts found.</p>}
    </div>
  );
}

export default App;
