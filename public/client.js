
const socket = io();

let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

textArea.addEventListener('keyup',(event)=>
{
   if(event.key === 'Enter')
    {
        const message = textArea.value
        textArea.value = '';
        sendMessage(message);

         //Send to server
        socket.emit('user_message',message.trim());
    }
})

function sendMessage(msg_)
{
    let msg = {
        sender : 'You',
        message : msg_.trim()
    }
    appendMessage(msg,'outgoing');
}

function appendMessage(msg,type)
{  
    let messageArea = document.querySelector('.message_area');
        

        //full div
        let mainDiv = document.createElement('div');
    if(msg.sender === 'BOT')
    {

        mainDiv.classList.add('main-div-for-array');
        //top-div
        let topDiv = document.createElement('div');
        topDiv.classList.add('top-div');
        mainDiv.appendChild(topDiv);


        //left-div
        let leftDiv = document.createElement('div');
        leftDiv.classList.add('left-div');
        leftDiv.innerHTML = `
            <img src= "/bot-logo.png" alt =":)" class="left-div-logo">`;
        
        topDiv.appendChild(leftDiv);

        //body-div ->right-div
        let rightDiv = document.createElement('div');
        rightDiv.classList.add('right-div');
        rightDiv.innerHTML = `<h4>${msg.sender}</h4><br>` ;

        if(typeof(msg.message) === 'object')
        {
            msg.message.forEach((value)=>
            {
                let subDiv = document.createElement('div')
                subDiv.classList.add(type ,'message');

                subDiv.innerHTML = `<p>${value}<p>`;
                rightDiv.appendChild(subDiv);
            });
        }
        else if(typeof(msg.message) === 'string')
            {
               let subDiv = document.createElement('div')
               subDiv.classList.add(type ,'message');

               subDiv.innerHTML = `<p>${msg.message}<p>`;
               rightDiv.appendChild(subDiv);
            }
        
        //timeStampDiv ->bottomDiv
        let bottomDiv = document.createElement('div');
        bottomDiv.classList.add('bottom-div');
        bottomDiv.innerHTML = `${getTimeStamp()}`;

        rightDiv.appendChild(bottomDiv);

        topDiv.appendChild(rightDiv);

    }
    else
    {
        mainDiv.classList.add('main-div-for-user');

        let topDiv = document.createElement('div');
        topDiv.classList.add(type, 'message');
        topDiv.innerHTML = `<p>${msg.message}</p>`;

        mainDiv.appendChild(topDiv);

        let bottomDiv= document.createElement('div')
        bottomDiv.classList.add('bottom-div-user');
        bottomDiv.innerHTML = `${getTimeStamp()}`;

        mainDiv.appendChild(bottomDiv);
    }
    messageArea.appendChild(mainDiv);
    scrollToBottom();
}


//Recieve messages broadcasted by Server

socket.on('response',(arg)=>
{
    appendMessage(arg,'incoming');
});

socket.on('First BOT message',(message_object)=>
    {
        messageArea.innerHTML = '';
        appendMessage(message_object,'incoming');
    });

function scrollToBottom()
{
    messageArea.scrollTop = messageArea.scrollHeight;
}

function getTimeStamp()
{
    hour = new Date().getHours();
    min = new Date().getMinutes().toString().padStart(2,'0');
    let postfix = 'am';

    if(hour >= 12)
        {
            hour = hour - 12;
            postfix = 'pm'
        }

    return(`${hour}:${min} ${postfix}`);

}


