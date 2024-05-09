import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NewsCard from "./NewsCard";

export default function NewsCardList(props) {
    //Extrag propsurile necesare
   const {newsList} = props;
   //Fololsesc gridul de bootstrap pt a aseza elementele in pagina
   return (
    <Container>
    <Row>
     {/*Iteram prin lista de stiri, si pt fiecare stire afisez un card */}
     {newsList.map((news) => {
          return (
            <Col xs={12} md={6} lg={4} className="mb-4" key={news.id}>
              {/* Atentie la denumirile cheilor din obiectul news si la denumirile prop-urilor lui NewsCard! */}
              <NewsCard
                newsId={news.id}
                imgSrc={news.thumbnail}
                title={news.title}
                description={news.description}
                hasCloseButton={news.hasCloseButton}
                
              />
            </Col>
          );
        })}
    </Row>
    </Container>
   )
}