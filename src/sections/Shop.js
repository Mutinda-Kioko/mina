import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";

import { motion } from "framer-motion"; 
import {FiChevronLeft,  FiChevronRight} from 'react-icons/fi'

import img1 from "../assets/Images/1.webp";
import img2 from "../assets/Images/2.webp";
import img3 from "../assets/Images/3.webp";
import img5 from "../assets/Images/5.webp";
import img6 from "../assets/Images/6.webp";
import PreOrderButton from "../components/PreOrderButton";
const Section = styled.section`
  min-height: 100vh;
  height: auto;
  overflow-x: scroll;
  scroll-behavior: smooth;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
 }

`;
const Container = styled.div `
display: flex;
align-items: center;
position:relative;
background-color: ${(props) => props.theme.grey};

`
const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  text-shadow: 1px 1px 1px ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 11;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;
const Right = styled.div`
  padding-left: 3%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.grey};
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h1 {
    width: 5rem;
    margin: 0 1rem;
  }
`;
const Item = styled(motion.div)`
  width: 20rem;
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
    cursor: pointer;
  }
  h1 {
    display: inline-block;
    width: fit-content;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
  }

  @media (max-width: 48em) {
    width: 15rem;
  }
`;

const Product = ({ img, title = "" }) => {
  return (
    <Item
      initial={{ filter: "grayscale(100%)" }}
      whileInView={{ filter: "grayscale(0%)" }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: "all" }}
    >
      <img src={img} alt={title} />
      <h1>{title}</h1>
      <PreOrderButton text = {`Hello, I am interested in your ${title} collection. Lets talk.`} />
    </Item>
  );
};
const Icon = styled.button`
width: 40px;
height: 40px;
border-radius:20px;
display: flex;
justify-content: center;
align-items: center;
background-color: ${(props) => props.theme.white};
border-color: #879a83;
&:hover {
  background-color: ${(props) => props.theme.grey};
}
z-index: 1;
`
const Shop = () => {
  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef(null);
  const horizontalRef = useRef(null);
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  //Anim
  const anim = (e) => {
    gsap.from(e.target, { scale: 1 });
    gsap.to(e.target, { scale: 1.5 });
  };
  const anim2 = (e) => {
    gsap.from(e.target, { scale: 1.5 });
    gsap.to(e.target, { scale: 1 });
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  useLayoutEffect(() => {
    let element = ref.current;
    let scrollingElement = horizontalRef.current;

    let pinWrapWidth = scrollingElement.offsetWidth;

    let t1 = gsap.timeline();

    setTimeout(() => {
      t1.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: pinWrapWidth,
          scroller: ".App", // locomotive element
          scrub: true,
          pin: true,
          // markers:true,
        },
        // we have to increase scrolling height of this section same as the scrolling element width
        height: `${scrollingElement.scrollWidth}px`,
        ease: "none,",
      });

      // Horizontal Scrolling
      t1.to(scrollingElement, {
        scrollTrigger: {
          trigger: scrollingElement,
          start: "top top",
          end: pinWrapWidth,
          scroller: ".App", // locomotive element
          scrub: true,

          // markers:true,
        },
        // we have to increase scrolling height of this section same as the scrolling element width
        x: -pinWrapWidth,
        ease: "none,",
      });
      ScrollTrigger.refresh();
    }, 5000);

    return () => {
      // Let's clear instances
      t1.kill();
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <Container>
       {scrollX !== 0 && (
    <Icon
    onClick={() => slide(-300)}

    >
    <FiChevronLeft size={40} color={"#879a83"}/>
    </Icon>
       )}
    <Section ref={scrl} onScroll={scrollCheck} id="shop">
      <Title data-scroll data-scroll-speed="-1">
        Collections
      </Title>
      <Right ref={horizontalRef}>
        <Product img={img1} title="Work" />
        <Product img={img2} title="Modest Palazzos" />
        <Product img={img3} title="Plaited Palazzos" />
        <Product img={img5} title="Light chiffon kimonos" />
        <Product img={img6} title="Colored abayas" />
      </Right>
    </Section>
    {!scrolEnd && (
      <Icon
      onClick={() => slide(+300)}
      >
          <FiChevronRight color="#879a83" size={40}/>
      </Icon>)}
    </Container>
  );
};

export default Shop;
