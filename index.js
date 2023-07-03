const io = require('socket.io')(3000);

const arrUser = [];


io.on('connection', (socket) => {
	console.log(socket.id);
	socket.on('NGUOI_DUNG',user =>{
		const isExist = arrUser.some(e => e.ten === user.ten);
        socket.peerId = user.peerId;
        if (isExist) return socket.emit('DANG_KY_THAT_BAT');
        arrUser.push(user);
        socket.emit('DANH_SACH', arrUser);
        socket.broadcast.emit('CO_NGUOI', user);
		console.log("online :" + arrUser.length);
	});
	
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});
	
	socket.on('disconnect', () => {
        const index = arrUser.findIndex(user => user.peerId === socket.peerId);
        arrUser.splice(index, 1);
        io.emit('AI_DO_NGAT_KET_NOI', socket.peerId);
		console.log("disconnect peerId :" + socket.peerId + " ten :" + socket.ten);
    });
});
