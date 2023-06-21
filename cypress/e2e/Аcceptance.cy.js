/// <reference types="cypress" />
import {set} from '../fixtures/formData.json'


describe('Verify Home Page elements', () => {
    const ItemNames = [
        'Бизнес-ланч',
        'Салаты',
        'Супы',
        'Горячее',
        'Пицца',
        'Мангал',
        'Сеты',
        'Плов',
        'Гарниры',
        'Выпечка',
        'Напитки',
        'Десерты',

    ];

    beforeEach(() => {
        cy.visit('/');
        // cy.fixture('formData').then((formData)=> {
        // this.formData=formData;

        
    });


    it('AT_1.00|Title check', () => {
        cy.title().should('eq', 'ИТЛЕ-Бистро | Быстрая доставка халяль-еды в Казани')
    })


    it('AT_1.01|Check elements in the header:Logo', () => {
        cy.get('[class*=Header_logoHolderMain__').should('be.visible')
    })
    // [class*=ProductCard_image__] 

    it('AT_1.02|Check elements in the header: Address form', () => {
        cy.get('[class*=Location_location__]').contains('Укажите адрес доставки')
    })


    it('AT_1.03|Check elements in the header: Phone number', () => {
        cy.get('[class*=Header_contact__CPzsf ]').contains('+7 843 500-60-35')
    })


    it('AT_1.04|Check elements in the header: Opening hours today', () => {
        cy.get('[class*=Header_closingTime__ ]').should('include.text', 'Сегодня работаем до')
    })


    it('AT_1.05|Check elements in the header: Table reservation button', () => {
        cy.get('[class*=Header_reserveButton__]').should('have.text', 'Забронировать')
    })


    it('AT_1.06|Check elements in the header: Cart button', () => {
        cy.get('[class*=Header_cartButton__]').should('be.visible')
        // cy.get('.Header_cartButtonLabel__hhss6').should('have.text', 'Корзина')

    })


    it('AT_1.07|Check elements in the header: Cart button', () => {
        cy.get('[class*=CartIcon_cartButton__]').should('be.visible')
    })


    it('AT_1.08|Check elements in the header: Authorization icon', () => {
        cy.get('[class*=Header_profileHolder__]').should('be.visible')
    })


    it.only('AT_1.09|Check banner block', () => {
        cy.get('[class*=Home_top__]'>'[class*=Banner_banner__]').should('be.visible')
        // cy.get('[class*=Home_top__]' > '[class*=Banner_banner__]' > #desktopSwiper > .swiper-wrapper > .swiper-slide-active >'[class*=Banner_slide__]').should('be.visible')
        cy.get('.Home_top__aGrXV > .Banner_banner__1cJJ3 > #desktopSwiper > .swiper-wrapper > .swiper-slide-next > .Banner_slide__2X1rX').should('be.visible')
        cy.get('.Home_top__aGrXV > .Banner_banner__1cJJ3 > #desktopSwiper > .swiper-wrapper > .swiper-slide-duplicate-prev > .Banner_slide__2X1rX').should('be.visible')
    })


    it('AT_1.10|Choice of delivery address', () => {
        cy.get('[class*=Location_location__]')
            .click()
        cy.get('[class*=Location_location__]').should('be.visible')
        cy.get('[class*=LocationInput_input__]')
            .should('have.attr', 'placeholder', 'Укажите  адрес доставки')
            .type('Боевая 2')
        cy.get('div.RestaurantSelectModal_locationSearch__CaYfq .Button_contained__1SP2E').should('be.disabled')
        cy.get('[class*=LocationInput_dropdown__]').each(($el, index) => {
            let text = $el.text()
            if (text.includes('Боевая улица, 2, Казань, Республика Татарстан')) {
                cy.wrap($el).click()
            }
        })
        cy.contains('Доставить сюда').click()
        cy.get('[class*=Location_orderType__]').should('include.text', 'Доставка')
        cy.get('.Location_address__vNeBE').should('include.text', 'Боевая улица, 26, Казань, ')
    })

    it('AT_1.11| Verification menu item names', function () {
        cy.get('[class*=Categories_categoryName__]').should('have.length', ItemNames.length).each(($el, index) => {
            expect($el.text()).to.be.equal(ItemNames[index])
        })
    })

    it('AT_1.12| User Authorization', function () {
        cy.get('[class*=Header_profileHolder__')
            .click()
        cy.get('[class*=ReactModal__Content]')
            .should('be.visible')
            .contains('Введите номер для авторизации')
        cy.get('[class*=PhoneVerificationForm_button__ ]').should('be.disabled')
        cy.get('[class*=PhoneVerificationForm_input__]').type(4999999999)
        cy.contains('Выслать код').click()
        cy.get('[data-testid="character-0"]').type('0000')
       

    })
    it('AT_1.13| Login and logout to personal account', function () {
        cy.get('[class*=Header_profileHolder__]')
            .click()
        cy.get('.ReactModal__Content')
            .should('be.visible')
            .contains('Введите номер для авторизации')
        cy.get('[class*=PhoneVerificationForm_button__]').should('be.disabled')
        cy.get('[class*=PhoneVerificationForm_input__]').type(4999999999)
        cy.contains('Выслать код').click()
        cy.get('[data-testid="character-0"]').type('0000').wait(2000)
        cy.url().should('include','/kazan')
        cy.get('[class*=Header_profileHolder__]').click()
        cy.url().should('include','/profile') 
     cy.get('[class*=Header_logoHolderMain__]').click()
     cy.url().should('include','/kazan')
    })


    set.forEach((obj) => {
    it(`AT_1.14|Form filling for ${obj.userName}`, ()=> {
        cy.get('[class*=Header_profileHolder__]')
        .click()
    cy.get('.ReactModal__Content')
        .should('be.visible')
        .contains('Введите номер для авторизации')
    cy.get('[class*=PhoneVerificationForm_button__]').should('be.disabled')
    cy.get('[class*=PhoneVerificationForm_input__]').type(4999999999)
    cy.contains('Выслать код').click()
    cy.get('[data-testid="character-0"]').type('0000').wait(2000)
    cy.url().should('include','/kazan')
    cy.get('[class*=Header_profileHolder__]').click()
        cy.get(':nth-child(1) > :nth-child(1) > .InlineInput_inputDataHolder__bpPXo>.InlineInput_editButton__3Ntk4>svg').click()
        cy.get('[class*=InlineInput_input__1ffln]')
        .clear()
        .type(obj.userName)
        cy.get(':nth-child(3) > :nth-child(1) > .InlineInput_inputDataHolder__bpPXo>.InlineInput_editButton__3Ntk4>svg').click()
        cy.get('[class*=InlineInput_input__]')
        .clear()
        .type(obj.email)
        cy.get(':nth-child(3) > :nth-child(1) > .InlineInput_inputDataHolder__bpPXo>.InlineInput_editButton__3Ntk4>svg').click()
        cy.get(':nth-child(3) > :nth-child(1) > .InlineInput_inputDataHolder__bpPXo')

    })
 })

})
