var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/usuarios');
var perfilRouter = require('./routes/perfil')
var pubRouter = require('./routes/publicacion')
var comentariosRouter = require('./routes/comentarios')
var amistadRouter = require('./routes/amistad')
var seguidorRouter = require('./routes/seguidores')
var mensajeRouter = require('./routes/mensaje-priv')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', usersRouter);
app.use('/perfil', perfilRouter)
app.use('/publicaciones', pubRouter)
app.use('/comentarios', comentariosRouter)
app.use('/amistad', amistadRouter)
app.use('/seguidores', seguidorRouter)
app.use('/mensajes', mensajeRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Configuración de Sequelize y modelos
const sequelize = require('./db');
const Usuario = require('./models/usuario-m'); 
const Perfil = require('./models/perfil-m')
const Seguidor = require('./models/seguidores-m');
const Publicacion = require('./models/publicacion-m');
const Notificacion = require('./models/notificaciones-m');
const MensajePrivado = require('./models/mensaje-priv-m');
const Comentario = require('./models/comentarios-m');
const Amistad = require('./models/amistad-m');



//Relación usuario/perfil (1:1)
Usuario.hasOne(Perfil, { unique: true });
Perfil.belongsTo(Usuario);

//Relación usuario/publicación (1:N)
Usuario.hasMany(Publicacion, { foreignKey: 'usuarioId' });
Publicacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });

//Relación publicación/comentario
Publicacion.hasMany(Comentario, { foreignKey: 'publicacionId' });
Usuario.hasMany(Comentario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

//Relación de amistad 
Amistad.belongsTo(Usuario, { as: 'Usuario1', foreignKey: 'usuario1Id' });
Amistad.belongsTo(Usuario, { as: 'Usuario2', foreignKey: 'usuario2Id' });

//Relaciòn de seguidor
Seguidor.belongsTo(Usuario, { foreignKey: 'seguidorId', as: 'Seguidor' });
Seguidor.belongsTo(Usuario, { foreignKey: 'seguidoId', as: 'Seguido' });

// Relaciòn de mensajes privados
MensajePrivado.belongsTo(Usuario, { foreignKey: 'remitenteId', as: 'Remitente' });
MensajePrivado.belongsTo(Usuario, { foreignKey: 'destinatarioId', as: 'Destinatario' });






// Sincroniza los modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos con la base de datos:', error);
  });

module.exports = app;
