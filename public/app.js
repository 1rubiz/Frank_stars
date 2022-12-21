// const dotenv = require("dotenv");

const left = document.querySelector('.left');
const right = document.querySelector('.right');
const main = document.querySelector('.main')
const login = document.querySelector('.log');
const trash = document.querySelector('.trash');
const signUp = document.querySelector('.sign_row');
const reg = document.querySelector('.reg_row');
const register = document.querySelector('.register');
let sign = document.querySelectorAll('.sign');
let inputs = document.querySelectorAll('input');
const set = document.querySelector('.set');
const home = document.querySelector('.home');
const display = document.querySelector('.display');
const register_user = document.querySelector('#register_user');
const reg_btn = document.querySelector('.reg_btn');
const log_user = document.querySelector('#log_user');
const log_input = log_user.querySelectorAll('input');
// const C = console.log.bind(document);


if(register_user){
    const reg_input = register_user.querySelectorAll('input');
}

log_user.addEventListener('submit', async (e)=>{
    e.preventDefault();
    let data = await reg_setup(log_input);
    await postData('/login', data);
    returnData('/login');
});

const adminSetup = ()=>{
    if(admin_setup.admin === true){
        fetch('/admin/setup');
    }
}


// function that gets the input values from the registration form
const reg_setup =(reg_input)=>{
    let reg_user_obj = {};
    reg_input.forEach((item)=>{
    let name = item.getAttribute('name')
    let value = item.value;
    reg_user_obj[name] = value;});
   return reg_user_obj;
    
}

// funtion that takes two arguments...
// url - the url path in which to post the data
// data - the data to be sent to the desired path
const postData = async(url = "", data)=>{
    try {
        const value = await fetch(url, {
            method: "POST",
        credentials: "same-origin",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(data)})
    return value;
}
    catch(err){
        console.log("error found "+err)
    }
}

//async function that get data back from the server
const returnData = async (url)=> {
    const data = await fetch(url);
    try{
        const res = await data.json();
    }
    catch(err){
        console.log("error found "+ err);
    }
}

// mobile dropdown setup
const blur_contail = document.querySelector('.blur_contain');
const mobile_nav = document.querySelector('.mobile_nav');
const mobile_links = document.querySelector('.mobile_links');
const mobile_dropdown = document.querySelector('.mobile_dropdown');
if (mobile_dropdown){
    mobile_dropdown.addEventListener('click', (e)=>{
        e.preventDefault();
    const mobile_nav = document.querySelector('.mobile_nav');
    if (mobile_links.style.display == "none" || !mobile_links.style.display){
        mobile_links.style.display = "block";
        blur_contail.style.display = "block"
        mobile_links.classList.add('mobile_background')
    }else {
        blur_contail.style.display = "none";
        mobile_links.style.display = "none";
        mobile_links.classList.remove('mobile_background')
    }
})
}

// register and signin display setup
const log_btn = document.querySelector('#log-btn');
if (log_btn){
    log_btn.addEventListener('click', (e)=>{
            register.style.display = "block";
            mobile_links.classList.remove('mobile_background');
            mobile_links.style.display = "none";
    });
}


if (login){
    login.addEventListener('click', (e)=>{
            if(register.style.display === "block"){
                register.style.display = "none";
                  mobile_links.classList.remove('mobile_background');
                  mobile_links.style.display = "none";
                  blur_contail.style.display = "none";
            }else{
                blur_contail.style.display = "block";
                register.style.display = "block";
            }
            if(reg){
                 reg.style.display = "block";
                 blur_contail.style.display = "block";
            }
    });
}

console
// switch setup between appointment and home service on the booking page
    let picky = (a, b, c)=>{
        a.addEventListener('click', ()=>{
            a.classList.add('active');
            b.classList.remove('active');
            c.style.display = "none";
        })
        b.addEventListener('click', ()=>{
            b.classList.add('active');
            a.classList.remove('active');
            c.style.display = "none";
        })
    }
    if (set) {
        picky(set, home, display);   
    }


if(trash){
    trash.addEventListener('click', ()=>{
        register.style.display = "none";
        blur_contail.style.display = "none";
    })
}



// function that sets the background image of a div to serve as a slideshow
let slide = (x)=>{
        let bar = document.querySelector('.bar'+x);
        for (let i = 1; i < 6; i++) {
            let check = document.querySelector('.bar'+i);
            if(x == i){
                main.id= "main"+i;
                check.classList.add("active");
            }else if(x != i){
                check.classList.remove("active");
            }
        }
}



let blog_slide = document.querySelector('.blog_slide');
let slide_right = document.querySelector('.slide_right');
let slide_left = document.querySelector('.slide_left');
let interval_temp = 0;
let interval_val = 1;

if (slide_right){
    const set_interval =
    setInterval(()=>{
        interval_val++;
        slide(interval_val);
        main.id = "main"+interval_val;
        if(interval_val > 5){
            interval_val = 1;
            main.id = "main"+interval_val;
            slide_right.style.display = "block";
            slide_left.style.display = "block";
            clearInterval(set_interval);
            slide(1);
        }
  }, 7000);

    slide_right.addEventListener('click', ()=>{
            if(interval_val >= 5){
                interval_val = 1;
            }else{
                interval_val++;
            }
            slide(interval_val);
            main.id= "main"+interval_val;
    });

    slide_left.addEventListener('click', ()=>{
            if(interval_val == 1){
                interval_val = 5;
            }else {
                interval_val--;
            }
            slide(interval_val);
            main.id = "main"+interval_val;
    });
}
    


const blog_trash = document.querySelectorAll('.blog_trash');

blog_trash.forEach((item)=>{
    let items = item.id;
    item.addEventListener('click', (e)=>{
        alert("do you want to delete this post ?.....");
        fetch("/blog/delete/"+items)
        .then((data)=>{
            //location.reload();
            if(data.status == 200){
                // reload page
                location.reload();
            }
        })
        .catch(err=>console.log(err))
    })
});

const createBlog = document.querySelector('#createBlog');
const blogFormDiv = document.querySelector('#blogForm');
const blogForm = document.querySelector('.blogForm');
const discard = document.querySelector('.discard');
if (createBlog){
    createBlog.addEventListener('click', (e)=>{
        if(blogForm.style.display === "block"){
            blogForm.style.display = "none";
            blur_contail.style.display = "none";
        }else {
            blogForm.style.display = "block";
            blur_contail.style.display = "block";
        }
    });
    discard.addEventListener('click', (e)=>{
        e.preventDefault();
        blogForm.style.display = "none";
        blur_contail.style.display = "none";
    })
}
if(blogFormDiv){
    blogFormDiv.addEventListener('submit', (e)=>{
        location.reload();
    blogForm.style.display="none";
})
}


const contact__form = document.querySelectorAll('.contact__form');
const contact_form = document.querySelector('#contact_form');

if(contact_form){
    // const emailFrom = contact_form.querySelector('#email_contact');
    // const content = contact_form.querySelector('#body_contact');
    // const subject = contact_form.querySelector("#subject_contact");
    // const options = {
    //     email: emailFrom.value,
    //     content: content.value,
    //     subject: subject.value,
    // };
    let options = reg_setup(contact__form);
    contact_form.addEventListener('submit', (e)=>{
        e.preventDefault();
        console.log(options)
    })
}