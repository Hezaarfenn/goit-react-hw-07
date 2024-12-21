import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import { selectFilteredContacts } from '../../redux/contactsSlice';

import Loader from '../Loader/Loader';

import styles from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const { loading, error } = useSelector((state) => state.contacts);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(id));
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (contacts.length === 0) {
    return <p>No contacts found.</p>;
  }

  return (
    <div>
      <h2>Contact List</h2>
      <ul className={styles.list}>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={styles.item}>
            <p>
              {name}: {number}
            </p>
            <button type="button" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
