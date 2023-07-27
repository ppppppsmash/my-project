"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentMigration1684997044371 = void 0;
class CommentMigration1684997044371 {
    constructor() {
        this.name = 'CommentMigration1684997044371';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`page\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deivice\` varchar(50) NOT NULL, \`name\` varchar(50) NOT NULL, \`url\` varchar(50) NOT NULL, \`date\` varchar(50) NOT NULL, \`label\` varchar(50) NOT NULL, \`lcp\` varchar(50) NOT NULL, \`fid\` varchar(50) NOT NULL, \`cls\` varchar(50) NOT NULL, \`fcp\` varchar(50) NOT NULL, \`tbt\` varchar(50) NOT NULL, \`si\` varchar(50) NOT NULL, \`score\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`page\``);
    }
}
exports.CommentMigration1684997044371 = CommentMigration1684997044371;
//# sourceMappingURL=1684997044371-CommentMigration.js.map