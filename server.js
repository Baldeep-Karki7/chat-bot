const exp = require('constants');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const determineMessage = require('./chatbot-logic');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname +'/public'));
app.set('view engine','ejs');

let reload = 0;

app.get('/',(req,res)=>
{
    res.render('index');
    pageReloadDisplay();
})

io.on('connection',(socket)=>
{
    console.log("Connected to ...",socket.id);

    
})

io.on('connection',(socket)=>
{
    socket.on('user_message',(arg)=>
    {
        console.log( 'Message recieved by Server',arg);

        let msg = {
            sender : 'BOT',
            message : 'Hi' //add a function to return a message 
        }


        const Timeout = setTimeout(()=>
        {
            socket.emit('response',msg);
        },1500);
    })
})

function pageReloadDisplay()
{
    first_bot_message_object = {
        sender : 'BOT',
        message :[
        `Hello! Welcome to Appointify Virtual Assistant, I can resolve 80% for your enquiry here.`,
        `Please choose from the list of Appointify Services that I can assist you?`,
        `<button class="services-btn"> Salon</button>
        <button class="services-btn">Tuition</button>
        <button class="services-btn">Medical Appointment</button>`]
    }

    io.on('connection',(socket)=>
    {
        const Timeout = setTimeout(()=>
        {
            socket.emit('First BOT message',first_bot_message_object);
        },1500);
    });
}

server.listen(PORT,()=>
{
    console.log("Server running on PORT",PORT);
})
;









