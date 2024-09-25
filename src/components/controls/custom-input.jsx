import PropTypes from 'prop-types';

// Material UI Components
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

function CustomInput({
  label,
  placeholder,
  register,
  name,
  errors,
  // touchedFields,
  type,
  id,
  otherProps,
  labelEnd,
  labelStart,
  disabled,
  value,
  hasBorder
}) {

  return (
    <FormControl>
      {label && <FormLabel sx={{
        marginBottom: '10px', fontWeight: '700', color: "#292D32",
        fontSize: { xs: '15px', md: '18px' }
      }}>{label}</FormLabel>}
      <TextField
        sx={{
          backgroundColor: 'transparent',
          height: type === 'textarea' ? 'auto' : '50px',
          borderRadius: '16px',

          '& fieldset': {
            border: hasBorder ? '1px solid #D7D7D7' : 'none',
            height: type === 'textarea' ? 'auto' : '50px',
          },

          '& ::placeholder': {
            fontSize: { xs: '14px', md: '15px', lg: '16px', xl: '18px' },
            color: '#889096',
          },
          '& textarea': { height: '100% !important' },
        }}
        id={id}
        label={placeholder ? '' : label}
        placeholder={placeholder}
        variant='outlined'
        disabled={disabled}
        value={value}
        type={type}
        // error={Boolean(errors[name] && touchedFields[name])}
        error={Boolean(errors[name])}
        {...otherProps}
        {...register(name)}
        inputMode='decimal'
        InputProps={{
          inputMode: type === 'number' && 'decimal',
          pattern: type === 'number' && "[0-9]*",
          autocomplete:'new-password',
          style: {
            height: type === 'textarea' ? 'auto' : '50px',
            backgroundColor: !hasBorder && '#F8F8F8',
            borderRadius: '12px',
            fontSize: '1rem',
          },
          endAdornment: labelEnd && (
            <InputAdornment position='end'>{labelEnd}</InputAdornment>
          ),
          startAdornment: labelStart && (
            <InputAdornment position='start'>{labelStart}</InputAdornment>
          ),
        }}
      />
      {/* Boolean(errors[name] && touchedFields[name]) */}
      {Boolean(errors[name]) && (
        <FormHelperText sx={{ color: 'red', mt: 1.5 }} id={name}>
          {errors[name]?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  name: PropTypes.string,
  errors: PropTypes.array,
  labelEnd: PropTypes.node,
  labelStart: PropTypes.node,
  id: PropTypes.number,
  hasBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
  otherProps: PropTypes.object,
}

export default CustomInput;
