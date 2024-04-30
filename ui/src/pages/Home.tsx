import { Component } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";

import hero_image from "../assets/hero.png";
import Hero from "../components/Hero";

const Home: Component = () => {
  return (
    <>
      <MetaProvider>
        <Title>Свободная одежда для всей семьи - Fomina Style</Title>
      </MetaProvider>
      <Hero image={hero_image} />
      <h1 style={{ "margin-top": "24px" }}>Fomina Summer Style 2024</h1>
    </>
  );
};

export default Home;
