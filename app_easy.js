const http = require('http');
const fs = require('fs');
const movies = require('./movies');
const faqs = require('./faqs');
const theaters = require ('./theaters');

// Servidor
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    // Route System
    switch (req.url) {
        // HOME
        case '/':
            res.write('TODO PELIS')
            res.write(
            `
            Bienvenidos a DH Movies el mejor sitio para encontrar las
            mejores peliculas,incluso mucho mejor que Netflix,Cuevana
            y Popcorn.

            `
            )
            //res.write(`total de peliculas ` + movies.length)
            res.write('\n\n')            
            res.write(`Total de peliculas  ${movies.length}`)
            res.write('\n\n')
            let titulos =[ ];
            movies.forEach(function(movie){
                titulos.push(movie.title)
            })
            titulos.sort()
            titulos.forEach(function(titulo){
                res.write(titulo);
                res.write('\n');
            })
            res.write(`
            - En Cartelera
            - Más votadas
            - Sucursales
            - Contacto
            - Preguntas frecunetes
            `)
            
            res.end();
            break;


            // EN CARTELERA
        case '/en-cartelera':
            res.write('TITULO: En cartelera\n')
            res.write('\n\n')            
            res.write(`Total de peliculas  ${movies.length}`)
            res.write('\n\n')
            res.write('LISTADO DE PELICULAS \n\n')

            movies.forEach(function(movie){
                res.write(
                `
                Titulo:${movie.title}
                reseña: ${movie.overview}
            
                `);
            })

            res.end('En cartelera');
            break;


            //MAS VOTADAS
        case '/mas-votadas':
            
        let masVotadas = movies.filter(function(movie){
                return movie.vote_average >=7;

            })

            res.write('TITULO: Más votadas\n')
            res.write('\n\n')            
            res.write(`Total de peliculas  ${masVotadas.length}`)
            res.write('\n\n')
            res.write('LISTADO DE PELICULAS \n\n')

            

            masVotadas.forEach(function(movie){
                res.write(
                `
                Titulo:${movie.title}
                Rating: ${movie.vote_average}
                reseña: ${movie.overview}             

                `);
            })

            res.end();
            break;


            //SUCURSALES
        case '/sucursales':

            res.write('TITULO: Sucursales\n')
            res.write('\n\n')            
            res.write(`Total de salas  ${theaters.length}`)
            res.write('\n\n')
            res.write('LISTADO DE SALAS \n\n')
            theaters.forEach(function(cine){
                res.write(
                    `
                    Titulo:${cine.name}
                    Rating: ${cine.address}
                    Descripcion: ${cine.description}             
    
                    `);

            })
            res.end();
            break;

            //CONTACTO
        case '/contacto':
            res.write('TITULO: Contactanos \n\n');
            res.write(`CONTENIDO: ¿ Tenés algo para contarnos? Nos encanta escuchar a nuestros clientes.
             Si deseas contactarnos podés escribirnos al siguiente email: dhmovies@digitalhouse.com
             o en las redes sociales. Envianos tu consulta, sugerencia o reclamo y será respondido a la
             brevedad posible. Recordá que también podes consultar la sección de Preguntas Frecuentes para
             obtener respuestas inmediatas a los problemas más comunes.`)
            res.end();
            break;

            //PREGUNTAS FRECUNETES
        case '/preguntas-frecuentes':
            res.write(`TITULO: Preguntas frecuentes \n\n`);
            res.write(`Pregunta 1: ¿Es usted el jefe de los minisupers? \n`);
            res.write('Respuesta: Si \n\n')
            res.write('Pregunta 2: ¿En serio?\n')
            res.write('Si \n\n');
            res.write('Pregunta 3: ¿Usted?\n')
            res.write('Respuesta: Así es!!!\n\n')
            res.end('Graciass vuelvas prontoss!!!');
            break;

            //404 NOT FOUND
        default:
            res.end('404 not found')
    }
}).listen(3030, 'localhost', () => console.log('Server running in 3030 port'));