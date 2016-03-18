var devUrl="gateway.sandbox.push.apple.com";
var disUrl="gateway.push.apple.com";
var apn=require("apn");
// var token="6f754ddd7694924c50a3773afcdcfa03d324d67147ebb632df45ebea77da4c41";
// var token="657b820b491efc41e30970bf80aedc76aed0ad374e022619e58e49b44228fa68";

var token="ddabfd75a3f1ff39b3f4f0ef3270e6033a1eb7c0beb617a8d12193191079647b";

//6941cb72601a3f4e1fb35b43bc46fda8ec4e5c1bc150c99b9912aa6e18a2ed05

var options={
	"cert":"Certification/cerl.pem",
	"key":"Certification/key.pem",
	"fingerprint":"123456",
	"gateway":devUrl,
	"port":2195
}

var apnConnection=new apn.Connection(options);
var device = new apn.Device(token);
var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 60;
note.badge = 1;
note.alert = 'test asder';
note.sound = 'default';
note.payload = {
'partyId': '565612732',
"token":"ddabfd75a3f1ff39b3f4f0ef3270e6033a1eb7c0beb617a8d12193191079647b",
"datetime":"2016-12-12 10:12",
"notifycontent":"notifycontent",
"notifytitle":"notifytitle",
"number":"HDC111111",
"apptype":"apptype",
"messagetype":"messagetype",
"operatorid":"operatorid"
}
note.device = device;

apnConnection.pushNotification(note, device);

apnConnection.on('connected',function() {
	console.log("Connected");
});

apnConnection.on('transmitted',function(notification, device) {
	console.log("Notificationtransmitted to:" + device.token.toString('hex'));
});

apnConnection.on('transmissionError',function(errCode, notification, device) {
	console.error("Notificationcaused error: " + errCode + " for device ", device,notification);
});

apnConnection.on('timeout',function () {
	console.log("ConnectionTimeout");
});

apnConnection.on('disconnected',function() {
	console.log("Disconnectedfrom APNS");
});

apnConnection.on('socketError',console.error);
