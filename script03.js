let hide1 = document.querySelector('.hide1');
let show1 = document.querySelector('.show1');
// let hide2 = document.querySelector('.hide2');
// let show2 = document.querySelector('.show2');

var password = true;
let input1 = document.querySelector('.pass1');
// let input2 = document.querySelector('.pass2');
let boxArr = [hide1, show1];
// console.log(boxArr);
for (let i = 0; i < boxArr.length; i++) {
    boxArr[i].addEventListener('click', () => {
        hide1.classList.toggle("active");
        // hide2.classList.toggle("active");
        show1.classList.toggle("active");
        // show2.classList.toggle("active");
        if (password == true) {
            input1.setAttribute('type', 'text');
            // input2.setAttribute('type', 'text');
        }
        else {
            input1.setAttribute('type', 'password');
            // input2.setAttribute('type', 'password');
        }
        password = !password;
    })
}


// let links = document.querySelectorAll(".links");
// console.log(links);
// console.log(links.length)
// let LogIn = document.querySelector(".login");
// let SignUp = document.querySelector(".signup");


// for (let i = 0; i < links.length; i++) {
//     links[i].addEventListener('click', (e) => {
//         e.preventDefault();
//         LogIn.classList.toggle("show-signup");
//         SignUp.classList.toggle("show-signup");

//     })
    
// }






