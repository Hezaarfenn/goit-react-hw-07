import { useSelector, useDispatch } from 'react-redux';
import { selectNameFilter, changeFilter } from '../../redux/filtersSlice';
import style from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <label className={style.filterLabel}>
      Filter contacts by name
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        className={style.filterInput}
      />
    </label>
  );
};

export default Filter;
