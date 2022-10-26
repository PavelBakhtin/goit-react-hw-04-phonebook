import PropTypes from 'prop-types';
import { StyledInputFilter } from './ContactsList/ContactsList.styled';
export const Filter = ({ onChange, value }) => {
  return (
    <label>
      <StyledInputFilter type="text" value={value} onChange={onChange} />
    </label>
  );
};
Filter.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
