import { Database } from "@db/sqlite";
const personalDetailsDb = new Database("./mock/database/people.db");

export const create_people_table_command = `
        CREATE TABLE IF NOT EXISTS people(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                salt TEXT NOT NULL
        );
`;

export default personalDetailsDb;