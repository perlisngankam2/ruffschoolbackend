/* eslint-disable prettier/prettier */
import { MikroOrmModule, MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

// const config: MikroOrmModuleSyncOptions = {
//     entities: ['./dist/entities'],
//     entitiesTs: ['./src/entities'],
//     dbName: "ruff_school_db_test",
//     type: 'postgresql',
//     password:"Choupy270991",
//     metadataProvider: TsMorphMetadataProvider,
    
//     migrations: {
//       path: './src/migrations',
//       allOrNothing: true,
//       disableForeignKeys: true,
//     },
// }


const config: MikroOrmModuleSyncOptions = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: "railway",
  user: 'postgres',
  type: "postgresql",
  host:"containers-us-west-18.railway.app" ,
  password:"CGal5z31Fzr6ixR5Wkb1",
  clientUrl: "postgresql://postgres:CGal5z31Fzr6ixR5Wkb1@containers-us-west-18.railway.app:5966/railway",
  metadataProvider: TsMorphMetadataProvider,
  // ssl: { rejectUnauthorized: false },
  
  migrations: {
    path: './src/migrations',
    allOrNothing: true,
    disableForeignKeys: true,
  },
}


export default config;
