import PropTypes from 'prop-types';

// Material UI Components
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

const CustomSelect = ({
  label,
  placeholder,
  errors,
  id,
  array,
  disabled,
  handleChange,
  errorsName,
  valueName,
  noBorder,
}) => {
  return (
    <FormControl>
     {label && <FormLabel sx={{
        marginBottom: '10px', fontWeight: '700', color: "#292D32",
        fontSize: { xs: '15px', md: '18px' }
      }}>{label}</FormLabel>}
      <Autocomplete
        // disablePortal
        disabled={disabled}
        getOptionSelected={(option, value) => option.id === value.id}
        options={array || []}
        getOptionLabel={option => option.label || ''}
        value={valueName || null}
        id={id}
        label={placeholder ? '' : label}
        placeholder={placeholder}
        variant='outlined'
        sx={{
          // height: '50px',
          '& .MuiOutlinedInput-root': {
            border: noBorder ? 'none': errorsName ? '1px solid red' : '1px solid #eee',
            padding: noBorder && '0',
            borderRadius: '16px',
            height: '50px'
          },
          '& .MuiInputBase-input' :{
            '&::placeholder':{
              fontSize: { xs: '14px', md: '15px', lg: '16px', xl: '18px' },

            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: noBorder && 'none',
          }
        }}
        errors={errors}
        renderInput={params => <TextField {...params} placeholder={placeholder} />}
        onChange={handleChange}
      />
      {Boolean(errorsName) && (
        <FormHelperText sx={{ color: 'red' }} id={id}>
          {errorsName.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};
CustomSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  errors: PropTypes.array,
  valueName: PropTypes.string,
  id: PropTypes.number,
  noBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  otherProps: PropTypes.object,
  errorsName: PropTypes.object,
  array: PropTypes.array,
  handleChange: PropTypes.func,
}
export default CustomSelect;