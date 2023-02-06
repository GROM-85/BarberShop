class Slider{
    constructor({selector,opts} = {}){
        this.currSlide = 0;
        this.sliderSelector = selector;
        this.elem = null;// elem which replace with slider
        this.slider = null; // generate slider
        this.slides = null; // for slides
        this.prev = null; // prev btn
        this.next = null; // next btn
        this.dots = []; // array of dot btns
        this.timerId = null; // time for autoslide

        const defaultOpts = {
            pauseTime:0,
            prevText:"Prev",
            nextText:"Next",
            generateDots:true,
            generatePrevNext:true,
        }
        // in case developer add some options they substitute default ones
        this.options = {...defaultOpts,...opts};
        console.log(this.options);

        this.generateSlider();
        this.changeSlide(this.currSlide);

    }

    generateSlider(){
        this.slider = document.querySelector(this.sliderSelector);
        this.slider.classList.add("slider");

        // container for slides
        const slidesCnt = document.createElement("div");
        slidesCnt.classList.add("slider-slides-cnt");

        this.slides = this.slider.children;

        while(this.slides.length){
            this.slides[0].classList.add("slider-slide");
            // we append current slide to div content ,thus we remove it from old place
            slidesCnt.append(this.slides[0]);
        }
        // than again query slides
        this.slides = slidesCnt.querySelectorAll(".slider-slide");
        console.log(this.slides)
        this.slider.append(slidesCnt);
        
        // create prev && next
        if(this.options.generatePrevNext)this.createPrevNext();
        // if(this.options.generateDots)this.createPagination();
    }

    createPrevNext(){
        this.prev = document.createElement("button");
        this.prev.type = "button";
        this.prev.innerText = this.options.prevText;
        this.prev.classList.add("slider-button","slider-button-prev");
        this.prev.addEventListener("click",this.slidePrev.bind(this));

        this.next = document.createElement("button");
        this.next.type = "button";
        this.next.innerText = this.options.nextText;
        this.next.classList.add("slider-button","slider-button-next");
        this.next.addEventListener("click",this.slideNext.bind(this));

        const nav = document.createElement("div");
        nav.classList.add("slider-nav");
        nav.appendChild(this.prev);
        nav.appendChild(this.next);
        
        this.slider.appendChild(nav);

    }

    createPagination(){
        const ulDots = document.createElement("ul");
        ulDots.classList.add("slider-pagination");

        for(let i = 0; i < this.slides.length;i++){
            const li = document.createElement("li");
            li.classList.add("slider-paginatiion-element");

            const btn = documnet.createElement("button");
            btn.classList.add("slider-pagination-button");
            btn.type = "button";
            btn.innerText = i + 1;
            btn.setAttribute("aria-label",`Slide ${i+1}`);
            btn.addEventListener("click",() => this.changeSlide(i));

            li.appendChild(btn);
            ulDots.appendChild(li);
            this.dots.push(li);
        }
        this.slider.appendChild(ulDots);
    }

    changeSlide(index){
        // remove class active
        this.slides.forEach(slide => {
            slide.classList.remove("slider-slide-active");
            slide.setAttribute("aria-hidden",true);
        });
        console.log(this.slides);

        this.slides[index].classList.add('slider-slide-active');
        this.slides[index].setAttribute("aria-hidden",false);

        //dots slide
        // if(this.options.generateDots){
        //     this.dots.forEach(dot=> {
        //         dot.classList.remove("slider-pagination-element-active");
        //     });
        //     this.dot[index].classList.add("slider-pagination-element-active")
        // }

        // set index for current slides
        this.currSlide  = index;

        // auto slide if pauseTime isnt 0 and "number"
        if(typeof this.options.pauseTime === "number" && this.options.pauseTime !== 0){
            console.log(this.options.pauseTime)
            clearTimeout(this.timerId);
            this.timerId = setTimeout(this.slideNext.bind(this),this.options.pauseTime);
        }
    }

    slidePrev(){
        this.currSlide--;
        if(this.currSlide < 0){
            this.currSlide = this.slides.length - 1;
        }
        this.changeSlide(this.currSlide);
    }

    slideNext(){
        this.currSlide++;
        if(this.currSlide > this.slides.length - 1){
            this.currSlide = 0;
        }
        this.changeSlide(this.currSlide);
    }
}

const opts = {
    pauseTime : 3500,
    generateDots:true,
    generatePrevNext:true,
}
const slider = new Slider({selector:".barber__slider",opts})