const heroTitle = document.querySelector(".hero__title")
const titleObserver = new IntersectionObserver((entries,observer)=>{
    const title = entries[0];
    if(title.isIntersecting) {
        title.target.classList.add("show");
        observer.unobserve(title.target);
    }
})

titleObserver.observe(heroTitle);


// ----- BENEFITES OBS -------

const benefitesCont = document.querySelector(".benefites__container");

const benefitObserver = new IntersectionObserver((entries,observer)=>{
const container = entries[0];
if(!container.isIntersecting) return;

let [left,right] = container.target.children;
left.classList.add("show");
right.classList.add("show");
},{
threshold: 0.5,
})

benefitObserver.observe(benefitesCont);


