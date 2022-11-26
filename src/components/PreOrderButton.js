import React from 'react'
import styled from "styled-components";


const BtnContainer = styled.button`
        background:#879a83;
        padding:20px 25px;
        border:none;
        font-size:22px;
        border-radius:10px;
        cursor:pointer;
        color:white;
        font-weight:bold;
        transition:0.3s ease all;
        box-shadow:1px 2px 3px rgba(0,0,0,0.3);
        &:focus {
                outline:none;
        }
        &.clicked {
            background:#383737;
        }
`;


function PreOrderButton(props) {
  return (
    <a href={`https://wa.me/254701063372?text=${encodeURIComponent(props.text)}`} target="_blank"
    rel="noopener noreferrer">
    <BtnContainer>
        Pre - Order Now
    </BtnContainer>
    </a>

  )
}

export default PreOrderButton