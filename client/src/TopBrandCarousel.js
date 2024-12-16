import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./asests/css/TopBrandsCarousel.css"; // Adjust path as needed

const TopBrandsCarousel = () => {
    const brands = [
        {
            name: "BVLGARI",
            imageUrl: "https://cdn.luxshopping.vn/Thumnails/Uploads/Images/bvl-luxshopping1-1.png.webp",
        },
        {
            name: "Omega",
            imageUrl: "https://cdn.luxshopping.vn/Thumnails/Uploads/Images/luxshoppingvn6-1.png.webp",
        },
        {
            name: "Dior",
            imageUrl: "https://cdn.luxshopping.vn/Thumnails/Uploads/Images/dior-luxshopping1-1.png.webp",
        },
        {
            name: "Hublot",
            imageUrl: "https://cdn.luxshopping.vn/Thumnails/Uploads/Images/hublot-luxshopping2-1.png.webp",
        },
        {
            name: "Longines",
            imageUrl: "https://cdn.luxshopping.vn/Thumnails/Uploads/Images/logo-longines-full.png.webp",
        },
        {
            name: "Cartier",
            imageUrl: "https://cdn.luxshopping.vn/Thumnails/Uploads/Images/cartier-luxshopping4.png.webp",
        },
        {
            name: "Vacheron Constantin",
            imageUrl: "https://cdn.luxshopping.vn/Thumnails/Uploads/Images/vacheron-constantin-luxshopping2-0.png.webp",
        },
        {
            name: "Tag Heuer ",
            imageUrl: "https://cdn.luxshopping.vn/Thumnails/Uploads/Images/tag-heuer-9.png.webp",
        },
        // Add more brands as needed
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        draggable: true,
        touchThreshold: 10,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="top-brands-carousel">
            <h2>TOP THƯƠNG HIỆU</h2>
            <Slider {...settings}>
                {brands.map((brand, index) => (
                    <div key={index} className="brand-slide">
                        <img src={brand.imageUrl} alt={brand.name} className="brand-image" />
                        <p>{brand.name}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TopBrandsCarousel;
