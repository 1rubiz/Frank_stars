const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv")
const express = require('express');
const User = require('./models/user');
const Blog = require('./models/create_blog');

dotenv.config()
// console.log(process.env.DB_USER)

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// MONGOOSE connect string for mongodb setup
//mongoose.connect(process.env.DB_CONNECT);
// on connect listen for port 8000
//mongoose.connection.once('open', ()=>{
    app.listen(8000, ()=>{
    console.log("Server setup at port 8000....")
});
//}).on('error', (err)=>{
  //  console.log("db error"+err);
//});

// Data set
let data = {
    arr : [],
    empty: "isEmpty",
    admin: true,
    stats_negative : "password is incorrect",
    warning : "You already have an account! Sign in instead"
}

// Function to create new user
const createUser = (item)=>{
    const user = new User({
        fullname : item.fullname,
        email : item.email,
        password : item.password
    });
    user.save()
}

// function to create blog
const BlogMaker = (item)=>{
    const blog = new Blog({
        topic : item.topic,
        body : item.body,
        date : item.date
    });
    blog.save();
}

// set view engine
app.set('view engine', 'ejs');

// set public files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/about', (req, res)=>{
    res.render('about');
})

// work in progress
app.get('/blog', (req, res)=>{
    // Blog.find()
    // .then((result)=>{
    //     const myArr=result.reverse();
    //     data.isEmpty = false;
    //     if (result == null){
    //         data.isEmpty = true;
    //     }
    //     data.arr = myArr;
      res.render('blog', {data})        
    // })
    // .catch((err)=>{
        // console.log(err);
    // })
});
const blogRemover= (e)=>{
    Blog.findOneAndRemove(e)
    .then((data)=>{
        console.log("Sucess...")
    })
    .catch((err)=>{console.log(err)});
}

app.post('/create/blog',async(req, res)=>{
    const date = Date().split(" ");
    const dateNow = date[0]+"-"+date[1]+"/"+date[2]+"/"+date[3];

    const blog = {
        topic : req.body.topic,
        body : req.body.body,
        date : dateNow
    }
    await BlogMaker(blog);
    res.redirect("/blog");
})

app.get('/blog/delete/:id', async (req, res)=>{
    const badBlog = {'id': req.params};
    await blogRemover(badBlog);
    res.sendStatus(200);
})
// admin route
app.get('/admin/setup', (req, res)=>{
    res.render()
})
app.get('/booking', (req, res)=>{
    res.render('booking');
})
app.get('/contact', (req, res)=>{
    res.render('contact')
})
app.get('/portfolio', (req, res)=>{
    res.render('portfolio')
})
app.get('/gallery', (req, res)=>{
    res.render('gallery');
})
app.get('/', (req, res)=>{
    res.render('index');
})
app.post('/login/me', (req, res)=>{
    User.findOne({email: req.body.email, password: req.body.password})
    .then((result)=>{
        if(result === null){
            console.log("new user register instead");
        }else{
            if(req.body.password == result.password){
                console.log("logged in...")
                // res.render('user', {info});
                res.send(result);
                // res.redirect('/')
            }else{
                console.log("password is incorrect")
                res.send(data[info]);
            }
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post('/login', async (req, res)=>{
    User.findOne({email: req.body.email, password: req.body.password}
        // , async (err, data)=>{
         // if(err) throw err; //There was an error with the database.
    )
    .then((result)=>{
         if(!result) console.log("No one is named Fernando."); //The query found no results.
         else {
               res.sendStatus(200).send(result);
              }
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.post('/register/me', (req, res)=>{
    const value = req.body;
    User.findOne({email: req.body.email})
    .then((result)=>{
        if (result == null){
               createUser(req.body)
            console.log("New user")
            // alert("new user")
        }else {
            res.render('user',{data})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    res.redirect("/")
});

app.use((req, res)=>{
    res.render('404')
})
