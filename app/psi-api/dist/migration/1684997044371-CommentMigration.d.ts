import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CommentMigration1684997044371 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
