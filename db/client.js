const pg = require('pg');
const { rows } = require('pg/lib/defaults');

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/univ_of_full_stack');
client.connect();

const getSchools = async() => {
    return(await client.query('SELECT * FROM "Schools";')).rows;
}

const getClass = async(id) => {
    return(await client.query('SELECT students.id, students.first_name, students.last_name, students.department_id, "Schools".name FROM students JOIN "Schools" ON students.department_id = "Schools".id WHERE students.department_id = $1;', [id])).rows;
}

const registerStudent = async({firstName, lastName, department}) => {
    await client.query('INSERT INTO students(first_name, last_name, department_id) VALUES($1,$2,$3);',[firstName, lastName, department]);
    return (await client.query('SELECT students.id, students.first_name, students.last_name, students.department_id, "Schools".name FROM students JOIN "Schools" ON students.department_id = "Schools".id WHERE students.department_id = $1;', [department])).rows;
}

const syncAndSeed = async()=> {
    try{
    const SQL = `
        DROP TABLE IF EXISTS students;
        DROP TABLE IF EXISTS "Schools";

        CREATE TABLE "Schools"(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );

        CREATE TABLE students(
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50) ,
            last_name VARCHAR(50) ,
            department_id INTEGER REFERENCES "Schools"(id)
        );

        INSERT INTO "Schools"(name) VALUES('School of Art');
        INSERT INTO "Schools"(name) VALUES('School of Science');
        INSERT INTO "Schools"(name) VALUES('School of Mathmetics');
        INSERT INTO "Schools"(name) VALUES('School of Engineering');
        INSERT INTO "Schools"(name) VALUES('School of Finance');

        INSERT INTO students(first_name, last_name, department_id) VALUES('Kevin', 'Kim',1);
        INSERT INTO students(first_name, last_name, department_id) VALUES('Lucy', 'Barrer',1);
        INSERT INTO students(first_name, last_name, department_id) VALUES('Moe', 'Jonson',1);

        INSERT INTO students(first_name, last_name, department_id) VALUES('Haley', 'Kim',2);
        INSERT INTO students(first_name, last_name, department_id) VALUES('Marry', 'Barrer',2);
        INSERT INTO students(first_name, last_name, department_id) VALUES('Joe', 'Jonson',2);

        INSERT INTO students(first_name, last_name, department_id) VALUES('Jessica', 'Kim',3);
        INSERT INTO students(first_name, last_name, department_id) VALUES('Hwak', 'Barrer',3);
        INSERT INTO students(first_name, last_name, department_id) VALUES('Michael', 'Jonson',3);

        INSERT INTO students(first_name, last_name, department_id) VALUES('Sung', 'Kim',4);
        INSERT INTO students(first_name, last_name, department_id) VALUES('Janie', 'Barrer',4);
        INSERT INTO students(first_name, last_name, department_id) VALUES('Jamie', 'Jonson',4);

        INSERT INTO students(first_name, last_name, department_id) VALUES('Chris', 'Kim',5);
        INSERT INTO students(first_name, last_name, department_id) VALUES('Taylor', 'Barrer',5);
        INSERT INTO students(first_name, last_name, department_id) VALUES('Jasmine', 'Jonson',5);
    `;
    await client.query(SQL);
        }
        catch(ex){
            console.log(ex);
        }
}

module.exports = {
    client,
    getSchools,
    getClass,
    registerStudent,
    syncAndSeed
}