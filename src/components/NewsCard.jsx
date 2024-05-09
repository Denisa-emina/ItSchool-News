 import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { removeFromFavorites } from '../store/Favorites/actions';
import { useContext } from 'react';
import { FavoritesContext } from '../store/Favorites/context';
import "./NewsCard.css";

 export default function NewsCard(props) {
  //Extrag functia care imi modifica stateul global
  const { favoritesDispatch } = useContext(FavoritesContext);
   //Extrag props urile componentei
   const { newsId, imgSrc, title, description, hasCloseButton } = props;

   function handleRemoveFromFavorites(id) {
    const actionResult = removeFromFavorites(id);
    favoritesDispatch(actionResult);
  
   }

   return(
    //La click pe card, vom deschide pagina cu detalii pt stire
    <Card className='newsCard d-flex flex-column align-items-center justify-content-between h-100'>
        {/*Caracterul / din Id il deruteaza pe react router, asa ca o sa codificam id-ul */}
        <Link to={`/news/${encodeURIComponent(newsId)}`}>
        <Card.Img src={imgSrc} variant='top' />
        <Card.Body>
         <Card.Title>{title}</Card.Title>
         <Card.Text>{description}</Card.Text>
        </Card.Body>
        </Link>
        {/*Daca avem buton de eliminare  de la favorite, il afisam - adica daca avem proprietatea hasCloseButton */}
        {hasCloseButton && (
        <Button
          variant="light"
          onClick={() => {
            handleRemoveFromFavorites(newsId);
          }}
        >
          <span className="material-icons text-dark">close</span>
        </Button>
      )}
    </Card>
   )

 }