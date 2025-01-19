const localVideoEl = document.querySelector('#local-video');
const remoteVideoEl = document.querySelector('#remote-video');


let localStream; //a var to hold the local video stream
let remoteStream; //a var to hold the remote video stream
let peerConnection; //the peerConnection that the two clients use to talk

let peerConfiguration = {
    iceServers:[
        {
            urls:[
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302'
            ]
        }
    ]
}

const call = async e=> {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true, 

});

localVideoEl.srcObject = stream;
localStream = stream;


//peer connection is all set with our stun servers sent over
await createPeerConnection();

//create offer time
try{
    console.log("creating offer...")
    const offer = await peerConnection.createOffer();
    console.log(offer);
}catch(err){
    console.log(err)
}

}

const createPeerConnection = ()=>{
    return new Promise(async(resolve, reject)=> {
        //rtcpeerconnection is the thing that creates the connection
        //we can pass a config obj, and that config obj can contain can contain stun servers
        //which will fetch us icecandidates
    peerConnection = await new RTCPeerConnection(peerConfiguration)
    peerConnection.addEventListener('icecandidate',e=>{
        console.log('...... ice candidate found!.......')
        console.log(e)
        })
        resolve();
    })
}


document.querySelector('#call').addEventListener('click',call)