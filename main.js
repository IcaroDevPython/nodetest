import express from 'express';
import http from 'http';
import socketio from 'socket.io';


const app = express()
const server = http.createServer(app)
const sockets = socketio(server);

app.use(express.static('public'))


// Define a lógica de conexão de clientes
sockets.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.emit('data', {"data": "Teste"})

  // Define a lógica de recebimento de dados do cliente
  socket.on('message', (data) => {
    console.log('Dados recebidos do cliente:', data);
  });

  // Define a lógica de fechamento da conexão
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Define a porta na qual o servidor irá escutar
const PORT = 3000;

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`Servidor de socket em execução em ${PORT}`);
});
