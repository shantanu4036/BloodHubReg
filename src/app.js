const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const Register = require("./models/registers");

require("./db/conn");

const port = process.env.PORT || 5500;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

//For login page 
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmpassword: cpassword,
                gender: req.body.gender,
                state: req.body.state,
                bdgroup:req.body.bdgroup
            });

            //Password Hash

            //middleware
            const registered = await registerEmployee.save();
            res.status(201).render("index");
        } else {
            res.send("Passwords do not match");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login page POST

app.post("/login", async (req, res) => {
    try 
    {
        const email = req.body.email;
        const password = req.body.password;

        
        const useremail = await Register.findOne({ email: email });
        if (useremail.password === password) {
            res.status(201).render("index");
        }
        else {
            res.send("<script> alert('Enter valid operation ') </script>");
        }
        



    }
    catch (error) {
        res.status(400).send("Invalid Email");
    }
    
});



// const bcrypt = require("bcryptjs");
// const securePassword = async (password) => {
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);
//     console.log(passwordHash);

//     const passwordmatch= await bcrypt.compare(password,passwordHash);
//     console.log(passwordmatch);
// }

// securePassword("das@112");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
