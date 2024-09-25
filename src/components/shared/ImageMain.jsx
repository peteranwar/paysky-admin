import PropTypes from 'prop-types';

// Material UI Components
import Box from '@mui/material/Box';

const ImageMain = (props) => {
  const { name, width, height, srcUrl, sx, alt, ...rest } = props;

  return (
    <Box component='img' width={width} height={height} sx={sx} src={srcUrl ?? `/assets/images/${name}`}
      loading="lazy" decoding="async"
      alt={alt ?? 'image'} {...rest} />
  );
};



ImageMain.propTypes = {
  name: PropTypes.string,
  srcUrl: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string,
  sx: PropTypes.object,
};

export default ImageMain;
