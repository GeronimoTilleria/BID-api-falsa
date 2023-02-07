const express = require("express");
const app = express();
const port = 8000;

const { faker } = require('@faker-js/faker');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class Usuario {
    constructor() {
        this.id = faker.datatype.uuid(),
            this.primerNombre = faker.name.firstName(),
            this.apellido = faker.name.lastName(),
            this.numeroTelefono = faker.phone.number(),
            this.correo = faker.internet.email(),
            this.contrasenha = faker.internet.password()
    }
}

class Empresa {
    constructor() {
        this.id = faker.datatype.uuid(),
            this.nombre = `${faker.name.firstName()} ${faker.name.suffix()}`,
            this.direccion = {
                calle: faker.address.street(),
                ciudad: faker.address.city(),
                estado: faker.address.state(),
                codigoPostal: faker.address.countryCode(),
                pais: faker.address.country()
            }
    }
}

console.log(new Usuario());

app.get("/api/users/new", (req, res) => {
    res.json(new Usuario);
});

app.get("/api/companies/new", (req, res) => {
    res.json(new Empresa);
});

app.get("/api/user/company", (req, res) => {
    const company = [ new Usuario(), new Empresa() ];
        
    res.json(company);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));

