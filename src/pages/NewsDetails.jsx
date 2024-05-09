import { useContext } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch"; 
import { getNewsDetails } from "../api/adaptor";
import { getFormattedDate } from "../utils/date";
import {Col, Container,Row }  from "react-bootstrap";
import "./NewsDetails.css";
import Button from "react-bootstrap/Button";
import { addToFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";


export default function NewsDetails(){
    // Extragem functia care modifica state-ul global.
  const { favoritesDispatch } = useContext(FavoritesContext);
    //Extrag newsId din url
    let { newsId } = useParams();
    //Avand in vedere ca am codificat id ul in NewsCard.jsx aacum trebuie si sa il decodific ca sa il pot trimite la API
    newsId = decodeURIComponent(newsId);
    //Generez endpointul pt detaliile stirii
    const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);

    const newsDetails = useFetch(newsDetailsEndpoint);
    //adaptez datele de la server in functie de datele necesare componentei
    const adaptedNewsDetails = getNewsDetails(newsDetails);
    //Extrag cheiile din adaptedNewsDetails folosind Object destructuring
    const { title, description, image, date, author, content, thumbnail } = adaptedNewsDetails;
    //Formatez data primita de la api catre fromatul: zi/luna/an
    const formattedDate = getFormattedDate(date);

    function handleAddToFavorites(news) {
        const actionResult = addToFavorites(news);
        favoritesDispatch(actionResult);
      }
 
    return (
        <Layout>
    <Container className="newsDetails my-5">
        <Row className='d-flex justify-content-center'>
            <Col xs={12} lg={8}>
                <h1 className="pt-2 mb-5">{title}</h1>
                <p className="fw-bold">{description}</p>
                {/*De la api noi primim imaginea sub from de taguri de html iar pt a le afisa pe ecran in react folosim prop-ul dangerouslySetInnerHTML echivalentul innerHtml din JS */}
                <div dangerouslySetInnerHTML={{__html:image}} className="mb-4"></div>
                <div className="d-flex justify-content-between align-iyems-center mb-4">
                    <div className="fw-bold">
                        <p>{author}</p>
                        <p className="mb-0">{formattedDate}</p>
                    </div>
                    <Button
                onClick={() => {
                  // Construim payload-ul actiunii si apelam functia care trimite actiunea catre reducer.
                  handleAddToFavorites({
                    id: newsId,
                    thumbnail,
                    title,
                    description,
                    hasCloseButton: true,
                  });
                }}
              >
                Adaugă la favorite
              </Button>
                </div>
                {/*Inserez continutul stirii - pt ca api ul imi returneaza fields.body cu taguri de html*/}
                <div dangerouslySetInnerHTML={{__html:content}} >

                </div>

            </Col>

        </Row>
    </Container>
    </Layout>
);
}