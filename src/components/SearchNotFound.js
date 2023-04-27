import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Không Tìm thấy !
      </Typography>
      <Typography variant="body2" align="center">
        Không có kết quả phù hợp với từ khóa &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Hãy thử bằng từ khóa khác
      </Typography>
    </Paper>
  );
}
