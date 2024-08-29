// Card.tsx

"use client";

import Image from "next/image";
import React from "react";
import "./Card.scss";

interface CardProps {
  title: string;
  description?: string;
  image?: any;
}

function Card({ title, description, image }: CardProps) {
  return (
    <div className="card">
      <div className="image">
        {/* <p className="new">New</p> */}
        <div className="text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <Image
          src={image}
          alt="image"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "8px",
          }}
        />
      </div>
      <div className="overlay"></div>
    </div>
  );
}

export default Card;
