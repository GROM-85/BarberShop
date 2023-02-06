import Swiper,{Pagination,Navigation} from "swiper";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

let opts ={
  modules: [Navigation, Pagination],
  direction: "horizontal",
  loop:true,
  pagination:{
    el: ".swiper-pagination",
    type:"bullets"
  },
  navigation:{
    nextEl:".swiper-button-next",
    prevEl:".swiper-button-prev",
  },
  spacebetween: 1,
  slidesPerView: 4,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter:true,
  }

}
let swiper = new Swiper(".swiper",opts);