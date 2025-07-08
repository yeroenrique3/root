import { useNavigate } from 'react-router-dom';
import Title from '../Title/Title';
import styles from './Categories.module.css';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { useFiltersContext } from '../../contexts/FiltersContextProvider';

const Categories = () => {
  const navigate = useNavigate();

  const { categories: categoriesFromContext } = useAllProductsContext();

  const { checkCategoryOnTabClick } = useFiltersContext();

  const handleCategoryClick = (categoryNameClicked) => {
    // update the category in filtersContext
    checkCategoryOnTabClick(categoryNameClicked);
    // then
    // navigate to products
    navigate('/products');
  };

  // FILTRAR CATEGORÍAS HABILITADAS SOLAMENTE
  const enabledCategories = categoriesFromContext.filter(category => !category.disabled);

  return (
    <section className='section'>
      <Title>Categorías</Title>

      <div className={`container ${styles.categoryContainer}`}>
        {enabledCategories.map(({ _id, categoryName, categoryImage }) => (
          <article
            key={_id}
            className={styles.category}
            onClick={() => handleCategoryClick(categoryName)}
          >
            <img src={categoryImage} alt={categoryName} />
            <div>{categoryName}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Categories;