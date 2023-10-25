import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { RolesService } from 'src/roles/roles.service';
import { UsersEntity } from './entities/users.entity';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
    private readonly roles: RolesService,
    private readonly files: FilesService,
  ) {}

  public async findAll(): Promise<UsersEntity[]> {
    return this.users.createQueryBuilder().select().getMany();
  }

  public async findById(id: number): Promise<UsersEntity> {
    return this.users
      .createQueryBuilder()
      .select()
      .where('id = :id', { id })
      .getOne();
  }

  public async findByEmail(email: string): Promise<UsersEntity> {
    return this.users
      .createQueryBuilder()
      .select()
      .where('email = :email', { email })
      .getOne();
  }

  public async create(data: CreateUserDTO): Promise<UsersEntity> {
    const id = await this.users
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute()
      .then((user) => user.identifiers[0].id);

    return this.findById(id);
  }

  public async update(id: number, data: UpdateUserDTO): Promise<UsersEntity> {
    await this.users
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();

    return this.findById(id);
  }

  public async destroy(id: number): Promise<UsersEntity> {
    const deletedUser = await this.findById(id);

    await this.users
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();

    return deletedUser;
  }

  async getRoleByTitle(userId: number, roleName: string | number) {
    await this.users
      .createQueryBuilder()
      .relation(UsersEntity, 'roles')
      .of(userId)
      .add((await this.roles.getByName(roleName)).id);

    return this.findById(userId);
  }

  async removeRoleByTitle(userId, roleName) {
    await this.users
      .createQueryBuilder()
      .relation(UsersEntity, 'roles')
      .of(userId)
      .remove((await this.roles.getByName(roleName)).id);

    return this.findById(userId);
  }

  async setProfilePicture(id: number, picture, bio) {
    if (picture) {
      const user = await this.findById(id);

      if (user.profile_picture) {
        fs.unlink(
          `./uploads/profilePictures/${user.profile_picture}`,
          (err) => {
            if (err) throw err;
          },
        );
      }

      await this.users
        .createQueryBuilder()
        .update()
        .set({
          profile_picture: picture.filename,
        })
        .where('id = :id', { id })
        .execute();
    }

    if (bio) {
      await this.users
        .createQueryBuilder()
        .update()
        .set({
          bio: bio.bio,
        })
        .where('id = :id', { id })
        .execute();
    }

    return this.findById(id);
  }

  public async getPhotoByEmail(email: string, res) {
    const photo = await this.findByEmail(email).then((response) =>
      response ? response.profile_picture : 'stockPicture.png',
    );

    return this.files.getProfileImage(photo ?? 'stockPicture.png', res);
  }

  public async getNameByEmail(email: string): Promise<string> {
    const userFIO = await this.users
      .createQueryBuilder('users')
      .select(['users.firstName', 'users.secondName', 'users.thirdName'])
      .where('email = :email', { email })
      .getOne();

    if (userFIO) {
      return `${
        userFIO.secondName + ' ' + userFIO.firstName + ' ' + userFIO.thirdName
      }`;
    } else {
      return email;
    }
  }

  public async emailWithoutPass(email: string) {
    return this.users
      .createQueryBuilder('users')
      .select([
        'users.firstName',
        'users.secondName',
        'users.thirdName',
        'users.bio',
        'users.grup',
        'users.roles',
        'users.profile_picture',
      ])
      .where('email = :email', { email })
      .getOne();
  }
}
