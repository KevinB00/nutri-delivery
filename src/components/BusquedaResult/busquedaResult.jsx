import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const SearchResult = ({ results }) => {
  return (
    <ListGroup className="search-results">
      {results.map(result => (
        <ListGroup.Item key={result.id}>
          <Link to={`${result.type === 'restaurante' ? `/restaurante/${result.id_plato}/platos` : `/plato/${result.id_plato}`}`}>
            {result.nombre}
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

SearchResult.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchResult;
