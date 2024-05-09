import React from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import NewsCardList from "../components/NewsCardList";
import { Link } from "react-router-dom";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { getNewsList } from "../api/adaptor";
import { useFetch } from "../utils/hooks/useFetch";

export default function Home() {
    //generez enpointurile pt categ de stiri
    const technologyNewsEndpoint = getNewsCategoriesEndpoint('technology', 1, 6);
    const footballNewsEndpoint = getNewsCategoriesEndpoint('football', 1, 6);
    //fetchuim datele de la the guardian 
    let  technologyData = useFetch(technologyNewsEndpoint);
    let footballData = useFetch(footballNewsEndpoint);

    //Adaptez datele primite de la server
    const adaptedTechnologyData = getNewsList(technologyData);
    const adaptedFootballData = getNewsList(footballData);
    
    
    return (
        <Layout>
          <section className="tech my-5">
            <Container>
              <h1 className="mb-5 pt-3">TECH</h1>
              {/* Afisam stirile despre technologie. */}
              <NewsCardList newsList={adaptedTechnologyData} />
              <p>
                Vezi toate știrile legate de tehnologie în secțiunea{" "}
                <Link to="/category/technology" className="text-secondary">
                  Tech
                </Link>
                .
              </p>
            </Container>
          </section>
          <section className="football my-5">
            <Container>
              <h1 className="mb-5 pt-3">FOTBAL</h1>
              {/* Afisam stirile despre fotbal. */}
              <NewsCardList newsList={adaptedFootballData} />
              <p>
                Vezi toate știrile legate de football în secțiunea{" "}
                <Link to="/category/football" className="text-secondary">
                  Football
                </Link>
                .
              </p>
            </Container>
          </section>
          <section className="favorites my-5">
            <Container>
              <h1 className="mb-5 pt-3">Favorite</h1>
              <p>Vrei sa salvezi stirile favorite pt a le citi mai incolo?</p>
              <p>In cadrul fiecarei stiri gasesti un buton prin care poti adauga stirea la favorite</p>
              <p className="pb-3">
                Viziteaza sectiunea{" "}
                <Link to='/favourites' className="text-secondary">
                  Favorite
                </Link>{" "}
                pentru a vedea stirile adaugate ca si favorite
              </p>
            </Container>

          </section>
    </Layout>
);
}