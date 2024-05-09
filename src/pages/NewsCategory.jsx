import React from "react";
import Layout from "../components/Layout";
import { useParams, useSearchParams } from "react-router-dom";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { getNewsList } from "../api/adaptor";
import { useFetch } from "../utils/hooks/useFetch";
import Container from "react-bootstrap/esm/Container";
import NewsCardList from "../components/NewsCardList";
import NewsPagination from "../components/NewsPagination";

export default function NewsCategory(){
    //Extrag parametrul categoryId din URL
   const { categoryId } = useParams();

   //Extrag query params din url
   const [ queryParams ] = useSearchParams();
   let currentPage = queryParams.get("page");

   //Daca nu avem query param in url- inseamna ca suntem pe pagina principala de category
   if(!currentPage) {
    currentPage = 1;
   }
   
   //Generez linkul pt categoria curenta
   const getNewsCategoryEndpoint = getNewsCategoriesEndpoint(categoryId, currentPage)
//Fac fetch la date de la the guardian server
const news = useFetch(getNewsCategoryEndpoint);
const adaptedNewsList = getNewsList(news);


let pageTitle= '';
switch (categoryId) {
    case ' technology':
        pageTitle = " Techology";
        break;
        case 'football':
            pageTitle = "Football"
            break;
            default:
                break; 
}

    return (
        <Layout>
      <Container className="my-5">
        <h1 className="mb-5 pt-3">{pageTitle}</h1>
        {/* Afisam lista stirilor. */}
        <NewsCardList newsList={adaptedNewsList} />
        {/*Afisam paginarea */}
        <NewsPagination active={currentPage} baseUrl={`/category/${categoryId}`} />

      </Container>
    </Layout>
);
}