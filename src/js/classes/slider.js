export default class Slider{
    constructor(){
        this.resource = 'https://frontend.camp.dev.unit6.ru/get-slides';

        this.slider = document.querySelector('.b-slider');
        this.dots = document.querySelector('.b-slider__dots');

        this.init(this.resource);
    }

    init(data){
        this.data = data;
        const self = this;

        return fetch(this.data)
        .then(function(response){
            if(response.status !== 200){
                console.log(response.status)
                return;
            }
            
            response.json().then(function(data){
                
                data = self.filterActive(data)
                data = self.filterStartDate(data)
                data = self.filterEndDate(data)
                data = self.sortOrder(data)
                data = self.resetPath(data)

                if(data.length == 0) return

                data.forEach(element => {
                    self.slider.insertAdjacentHTML('beforeEnd', self.render(element))
                    self.dots.insertAdjacentHTML('beforeEnd', self.setDots())
                });

                self.displayHide(self.slider);

                self.slider.children[1].classList.add('b-slide--active')
                self.dots.children[0].classList.add('b-slider__dot--selected')
                
                self.displaySlide(self.slider)

                self.dots.addEventListener('click', self.heandlClick.bind(this))

            })
        })
        .catch(function(err) {  
            console.log('Fetch Error :-S', err);
        });
    }

    filterActive(data){
        return data.filter(element => element.active == true)
    }

    filterStartDate(data){
        return data.filter(element => new Date(element.startDate * 1000).getTime() < new Date().getTime());
    }

    filterEndDate(data){
        return data.filter(element => new Date(element.endDate * 1000).getTime() > new Date().getTime());
    }

    sortOrder(data){
        return data.sort(function(a,b) {return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0);} ); 
    }

    resetPath(data){
        return data.filter(element => element.image = element.image.replace("../", ""))
    }

    render(data){
        return (
            `<div class="container b-slide"> 
                <div class="row">
                    <div class="col-xs-7">
                        <h2 class="b-slide__title">${data.title}</h2>
                        <h3 class="b-slide__text">${data.text}</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4">
                        <button class="b-slide__button b-button b-button--primary">Заказать доставку</button>
                    </div>
                </div>
                <div class="b-slide__image" style="background-image: url()">
                    <img src="${data.image}" />
                </div>
            </div>`
        )
    }

    setDots(){
        return `<div class="b-slider__dot"></div>`
    }

    displaySlide(slider){
        for(let i =0; i < slider.children.length; i++){
            if(slider.children[i].classList.contains('b-slide--active')){
                slider.children[i].style.display = "block";
            }
        }
    }

    displayHide(slider){
        for (let i=0; i<slider.children.length; i++) {
            if(slider.children[i].classList.contains('b-slide')){
                slider.children[i].style.display = "none";
            }
        } 
    }

    heandlClick(event){
        let slides = document.querySelectorAll('.b-slide');

        if(event.target.classList.contains('b-slider__dot--selected') ||
            event.target.classList.contains('b-slider__dots') ){
            return
        }else{
            for(let i = 0; i < event.target.parentNode.children.length; i++){
                event.target.parentNode.children[i].classList.remove('b-slider__dot--selected')
                slides[i].classList.remove('b-slide--active')
                slides[i].style.display = 'none';
            }

            event.target.classList.add('b-slider__dot--selected')

            let dots = document.querySelectorAll('.b-slider__dot');
            
            for(let i = 0; i < dots.length; i++){
                if(dots[i].classList.contains('b-slider__dot--selected')){
                    slides[i].classList.add('b-slide--active')
                    slides[i].style.display = 'block';
                } 
            }
        }
         
    }
}