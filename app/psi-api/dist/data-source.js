"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const page_entity_1 = require("./entities/page.entity");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'db',
    port: 3310,
    username: 'root',
    password: 'rootpasswd',
    database: 'pagespeedinsights',
    logging: true,
    synchronize: false,
    entities: [page_entity_1.Page],
    migrations: ['dist/migration/*.js'],
});
//# sourceMappingURL=data-source.js.map