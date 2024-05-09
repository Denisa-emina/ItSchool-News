import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import './Layout.css';

export default function Layout(props){
    //Componenta layout primeste ca si copii anumite tag-uri atunci cand este instantiata-asadar ma folosesc de props.children
    return (
        <div className="Layout">
            <Header />
            {/*Aici va fi contentul trimis de componenta care cheama acest Layout */}
            <main>{props.children}</main>
            <Footer />
        </div>
    )
}