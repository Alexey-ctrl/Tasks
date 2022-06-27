import {io} from "socket.io-client";
import {getJwt} from "@/cookie";

const socket = io({transports: ["websocket"]});

export function subscribeToTasks(cd) {
    socket.on('verify-error', id => cd('verify-error', id));
    socket.on('update-task', task => cd('update-task', task));
    socket.on('delete-task', id => cd('delete-task', id));
    socket.on('add-task', task => cd('add-task', task));
    socket.on('error', data => cd('error', data));
}

export function sendTask(task) {
    return emit('update-task', task);
}

export function deleteTask(id) {
    return emit('delete-task', id, false);
}

export function createTask(task) {
    return emit('create-task', task);
}

function emit(event, data, authCheck = true) {
    if (!socket.connected) {
        socket.connect();
        return {error: 'Connection error. Try again'};
    }
    if (authCheck)
        data.JWT = getJwt();
    return socket.emit(event, data);
}
