import express from "express"
import {engine} from 'express-handlebars'
import path from 'path'
import indexRoutes from "./routes/index"
import tasksRoutes from "./routes/tasks"
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access'
import Handlebars from 'handlebars'

class Application {
    app: express.Application;

    constructor(){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
        
       
    }

    settings(){
        this.app.set('port', 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', engine({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs',
            handlebars: allowInsecurePrototypeAccess(Handlebars)
        }))
        this.app.set('view engine', '.hbs')
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(){
        this.app.use(indexRoutes)
        this.app.use('/tasks', tasksRoutes)
        this.app.use(express.static(path.join(__dirname, 'public')))
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'))
        })
    }
}

export default Application