import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap'
import '../css/carouselStyle.css'

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <Carousel style={{ height: 'auto', width: '100%' }} activeIndex={index} direction={direction} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          style = {{height: "20rem"}}
          className="item1 w-100"
          // src="https://file.hstatic.net/1000360860/file/56.1_8fc931e9ecee47cc8a3cd90331c9bb2b_grande.png"
          src="https://nhathuoclongchau.com/upload/post/44063/images/tac-hai-cua-tra-sua-su-that-dang-sau-khien-ban-bat-ngo1.jpg"
          alt="trasua1"
        />
        <Carousel.Caption>
          <h3>Toẹt vời</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: '20rem' }}
          className="item2 w-100"
          src="https://trasuakoithe.com/wp-content/uploads/2019/06/61406893_2648778605135522_8625186846046945280_o.jpg"
          alt="trasua2"
        />

        <Carousel.Caption>
          <h3>Sảng khoái</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: '20rem' }}
          className="item3 w-100"
          src="https://vinid.net/wp-content/uploads/2019/08/20190820_AppVinID_BannerWeb_MasterTea.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Yolo</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
