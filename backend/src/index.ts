import db from "./db";

async function main(){
    const client = await db.connect();
    console.log((await client.query(`SELECT * FROM "Users"`)).rows);
    console.log((await client.query(`SELECT * FROM "Freights"`)).rows);
    console.log((await client.query(`SELECT * FROM "Vehicles"`)).rows);
    console.log((await client.query(`SELECT * FROM "VehicleTypes"`)).rows);
    client.release()
}
main()