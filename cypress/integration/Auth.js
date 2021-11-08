import { auth } from "../../src/firebase"

function generator(name, value) {
    return `${name}=${value}`

}
describe('Auth test', () => {

    before(async() => {
     
       
      

    //     auth.signInWithEmailAndPassword("test@gmail.com", "123456")
    // .then(function(result){
    //     console.log("token "+result.user.refreshToken)
    //     token=""+result.user.refreshToken;

    // });
    // cy.setCookie("before","token")

    // const result =await auth.signInWithEmailAndPassword("test@gmail.com", "123456")
    
        // console.log("token "+result.user.refreshToken)
    //    token= result.user.refreshToken;

    //    cy.setCookie("after","hhi")
    //    console.log("tooken "+token)
    

     // cy.setCookie("token","token")
    //  console.log("tooken after "+token)
    //  cy.setCookie("dd","hhi")

        // cy.login("test@gmail.com", "123456")
        // .then(value => console.log(value+" val"));

        //cy.setCookie('token' , cy.login("test@gmail.com", "123456")+'login' )
        //.then(function(result){

        //     result.getToken().then(function(token){
        //         $rootScope.userLoginToken = token;
        //     })
        // });
        //     if(cy.location("pathname").should("eq", "/dashboard")){
        //     cy.setCookie("login",'sss')}
        // else{
        //     cy.setCookie("login",'f')}

      })

    beforeEach(() => {
        // Cypress.Cookies.preserveOnce('token')
        // cy.visit("/")
      //  cy.login("test@gmail.com" , "123456");
//        cy.clearCookies()
    })

    it("upload ", function (){
        auth.signInWithEmailAndPassword("test@gmail.com", "123456")
        cy.visit("/dashboard")
        let srcBefore , srcAfter;

        cy.get('[data-cy="img1"]').invoke("prop" , 'src').then(atr=>{
            srcBefore=atr
        })
        cy.fixture('img2.jpg').as("img");
        cy.get('[data-cy="uploade img1"]') .attachFile('img2.jpg').then(()=>{

            cy.get('[data-cy="img1"]').invoke("prop" , 'src').then(atr=>{
                srcAfter=atr
            })
        expect(srcAfter).not.eq(srcBefore)
            // cy.get('[data-cy="img1"]')
            //.should('have.proparites', 'input' )
        //  .then(($el) =>{
        // //  expect($el).to.have.property('value')
        //     cy.log($el.get.value+"after")
        //  }
        //  )
        })

        cy.log("atr " +cy.get('[data-cy="uploade img1"]').invoke("prop" , "value"))
         
        //  cy.pause()
        //  cy.get('[data-cy="img1"]').should('have.attr', 'src' , 'img2.png')
    })

    it.only("chat" , ()=>{
        cy.server()
        auth.signInWithEmailAndPassword("test@gmail.com", "123456")
        cy.visit("/dashboard")
        
        cy.get('[data-cy="open chat"]').click()

        cy.get('[data-cy="test message"]').type("hi test")
        let before
        
         cy.get('[data-cy="messages"]').then (el =>{
            before=el.length
        })
        
       cy.task('send')
        // cy.get('[data-cy="send message"]').click().then(()=>{
        //     cy.get('[data-cy="messages"]').then (el2 =>{
        //         after=el2.length
        //         expect(before).eq(after-1)
        //     })

        // })
        
        //its('length').should("eq" , 1)
        // cy.fixture("chat.json").as("chat");
        // cy.route({
        //     method: "GET",
        //     url: "https://AIzaSyAEoBb1_fnHXoJEjA-ToUSR5aanufXVn3k.firebaseio.com/Messages.json",
        //     delay: 3000,
        //     response: "@chat",
        //   }).as("chatRequest");
    })

    it("true2 ", () => {
        expect(true).eq(true)
    })

    it.skip("open signup and return to login", () => {
        cy.visit("http://localhost:3000/")
        cy.get('#signup').click()
        cy.location("pathname").should("eq", "/signup")
        // cy.get("[data-cy='/signupCard'] [data-cy='/login']").click()
        cy.get('[data-cy="/login"]').click()
    })

    it.skip("sign in page", () => {
        // cy.get('#signup').click
        // cy.location("pathname").should("eq" , "/signup")

        // cy.session([username, password], () => {
        //     cy.request({
        //       method: 'POST',
        //       url: '/login',
        //       body: { username, password },
        //     }).then(({ body }) => {
        //       window.localStorage.setItem('authToken', body.token)
        //     })
        //   })

        cy.get('#email').type("test@gmail.com")
        cy.get('#pass').type("123456")
        cy.get('#submit').click()

    });

    it.skip('Show error ', () => {

    });
});