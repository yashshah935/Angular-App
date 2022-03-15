var express = require("express");
var app = express();
const jwt = require("jsonwebtoken")
var session = require("express-session");
const port = 8000;

const TOKEN_SECRET = "sudh8dishksnadisdshdbasdsknosadjodkdnbdudj"
//limits for image uploading
app.use(express.urlencoded({ extended: true }, { limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))

var cors = require('cors');
app.use(cors());

const User = require("./models/Users")
var mongoose = require("mongoose");
const { findOne } = require("./models/Users");
mongoose.Promise = global.Promise;
//for localhost
//mongoose.connect("mongodb://localhost:27017/OnlineEmailSystem", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://root:root@cluster0.xitb8.mongodb.net/OnlineEmailSystem", { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', mongoConnected);

function mongoConnected() {

    var EmailSchema = new mongoose.Schema({
        mail_id: Number,
        username: String,
        from: String,
        to: String,
        sub: String,
        msg: String,
        time: String,
        read: Boolean,


    }, { collection: 'Mails' });
    var DraftSchema = new mongoose.Schema({
        mail_id: Number,
        username: String,
        from: String,
        to: String,
        sub: String,
        msg: Object,
        time: String,
        read: Boolean,


    }, { collection: 'Draft' });
    var Counter = new mongoose.Schema({
        _id: String,
        sequence_value: Number,

    }, { collection: 'counters' });

    var Draft_count = new mongoose.Schema({
        _id: String,
        draft_value: Number,

    }, { collection: 'draft_count' });


    var Mail = mongoose.model("Email", EmailSchema);
    var Draft = mongoose.model("Draft", DraftSchema);
    var next = mongoose.model("Counter", Counter);
    var next_draft = mongoose.model("next_draft", Draft_count);

    //get mail list
    app.get("/mail", (req, res) => {
        Mail.find(function(err, mails) {
            if (err) return res.status(400).json({ error: 'Mail not found!' })

            return res.status(200).json(mails);
        });
    });
    //get draft list
    app.get("/mail/draft", (req, res) => {
        Draft.find(function(err, mails) {
            if (err) return res.status(400).json({ error: 'Mail not found!' })

            return res.status(200).json(mails);
        });
    });
    //read mail
    app.post("/mail/:id/read", (req, res) => {
        var query = { mail_id: req.params.id };
        var newvalues = { $set: { read: true } };
        Mail.updateOne(query, newvalues, (err) => {
            if (err) return res.status(400).json({ error: 'Mail not found!' });
            return res.status(200).json({ message: 'Mail added successfully!' })

        });
    });
    //get draft by id
    app.get("/mail/:id/draft", (req, res) => {

        var query = { mail_id: req.params.id }
        Draft.find(query, function(err, mail) {
            if (err) return res.status(400).json({ error: 'Mail not found!' })
            return res.status(200).json(mail)
        });
    });
    //get mail by id
    app.get("/mail/:id", (req, res) => {

        var query = { mail_id: req.params.id }
        Mail.find(query, function(err, mail) {
            if (err) return res.status(400).json({ error: 'Mail not found!' })
            return res.status(200).json(mail)
        });
    });
    //post draft 
    app.post("/mail/draft", (req, res) => {
        var myData = new Draft(req.body);
        next_draft.findOne(function(err, counter) {
            if (err) return res.status(400).json({ error: 'counter not found!' })
            counter.draft_value = counter.draft_value + 1;
            myData.mail_id = counter.draft_value;
            counter.save(function(err) {
                if (err) return res.status(400).json({ error: 'Cannot update counter!' })
            });
        });

        setTimeout(() => {
            myData.save(function(err) {
                if (err) return res.status(400).json({ error: 'Cannot add mail!' })
                return res.status(200).json({ message: 'Draft added!' })
            });
        }, 1000);
    });
    
    //update draft
    app.put("/mail/draft", (req, res) => {
        var query = { mail_id: req.body.mail_id }
            //console.log(req.body);

        Draft.findOne(query, function(err, draft) {
            if (err) return res.status(400).json({ error: 'Cannot found' })

            draft.username = req.body.username;
            draft.from = req.body.from;
            draft.to = req.body.to;
            draft.sub = req.body.sub;
            draft.msg = req.body.msg;
            draft.time = req.body.time;
            draft.read = req.body.read;
            console.log(draft);
            var id = draft._id;
            draft.save(function(err) {
                if (err) return res.status(400).json({ error: 'Cannot add mail!' })
                return res.status(200).json({ message: 'Draft Updated!' })
            });

        })



    });


    //post mail
    app.post("/mail", (req, res) => {
        //console.log(req.body)
        delete req.body._id;
        var myData = new Mail(req.body);
        next.findOne(function(err, counter) {
            if (err) return res.status(400).json({ error: 'counter not found!' })
            counter.sequence_value = counter.sequence_value + 1;
            //console.log(counter.sequence_value);
            myData.mail_id = counter.sequence_value;
            counter.save(function(err) {
                if (err) return res.status(400).json({ error: 'Cannot update counter!' })
                   
            });
        });

        setTimeout(() => {
            
            myData.save(function(err) {
                if (err){
                    console.dir(err)
                    return res.status(400).json({ error: 'Cannot add mail!' })
                }
                return res.status(200).json({ message: 'Mail added successfully!' })
            });
        }, 1000);


    });
    //delete draft 
    app.delete("/mail/:id/draft", (req, res) => {
        var query = { mail_id: req.params.id }
            
        Draft.deleteOne(query, function(err) {
            return err ? res.status(400).json({ error: "Mail does not exist!" }) :
                res.status(200).json({ message: 'Ok' });
        });
      
    });

    //login Api
    //login
    app.post('/api/login', async(req, res) => {
        const { email, password } = req.body

        const resp = await User.findOne({ email, password })
        console.log(resp)
        if (!resp) {
            res.json({
                success: false,
                message: "Incorrect details"
            })
        } else {
            const token = jwt.sign({
                id: resp._id,
                email: resp.email,
            }, TOKEN_SECRET)
            res.json({
                    success: true,
                    token: token
                })
                
        }
    })
   //register
    app.post('/api/register', async(req, res) => {
        const u = req.body
        const user = new User(u)
        console.log(u)
        const resp = await user.save()
        //console.log(resp)
        res.json({
            success: true,
            message: "welcome"
        })

    })
    //get users data
    app.post('/api/userdata', async(req, res) => {
        const token = req.body
        //console.log(token)
        const Obj = jwt.verify(token.token, TOKEN_SECRET)
        //console.log(Obj)
        const user = await User.findOne({ email: Obj.email })
        console.log(user)
        if (!user) {
            res.json({
                status: false,
                message: "User was deleted"
            })
            return
        }
        res.json({
            status: true,
            email: Obj.email,
            username : user.fname
        })
    })
    //logout
    app.get('/api/logout', (req, res) => {
        console.log("entered in logout")
        req.session.destroy()
        res.json({
            success: true
        })
    })

    //validate mail while Sending mail
    app.post('/api/mailValidate',async(req,res)=>{
        let email = req.body.email
        console.log(email)
        const user = await User.findOne({email:email})

        console.log(user)
        if(user){
            res.json({
                status:true

            })
        }else{
            res.json({
                status:false,
                message:"Mail does not exist!"
            })
        }
    })
    //validate mail while generating 
    app.put('/api/emailValidate', async(req, res) => {
            emailp = req.body.email
            const user = await User.findOne({ email: emailp })
            if (user) {
                res.json({
                    success: false,
                    message: "Mail already exist try another one!!"
                })
                return
            } else {
                oldvalue = { email: "nothing@gmail.com" }
                const resp = await User.updateOne(oldvalue, {
                        $set: {
                            email: emailp
                        }
                    },
                    (err, resp) => {
                        if (err) {
                            res.send(err)
                            return
                        }
                        console.log("1 document updated");
                        
                        res.json({
                            success: true,
                        })

                    })
            }
        })       
}

app.listen(port, function(err) {
    if (err)
        console.log("Error in server setup")
    else
        console.log("Server listening on Port "+port+" \n==> Link http://localhost:8000/ <==");
});