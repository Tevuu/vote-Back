import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Res,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { UsersEntity } from './entities/users.entity';
import { editFileName, imageFileFilter } from '../config/files.utils';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Возвращает множество пользователей' })
  @ApiOkResponse({
    description: 'Множество пользователей',
  })
  @Get()
  private getAll(): Promise<UsersEntity[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Возвращает пользователя по уникальному идентифекатору',
  })
  @ApiOkResponse({
    description: 'Пользователь, согласно заданному запросу',
  })
  @ApiNotFoundResponse({
    description: 'Запрошенный пользователь с таким id не найден',
  })
  @Get(':id')
  private getById(@Param('id') id: number): Promise<UsersEntity> {
    return this.usersService.findById(id);
  }

  @ApiOperation({
    summary: 'Возвращает пользователя по почте',
  })
  @ApiOkResponse({
    description: 'Пользователь, согласно заданному запросу',
  })
  @ApiNotFoundResponse({
    description: 'Запрошенный пользователь с такой почтой не найден',
  })
  @Get('/email/:email')
  private getByEmail(@Param('email') email: string): Promise<UsersEntity> {
    return this.usersService.findByEmail(email);
  }

  @ApiOperation({ summary: 'Создает пользователя' })
  @ApiOkResponse({
    description: 'Созданный пользователь в соответствии заданному запросу',
  })
  @Post()
  private create(@Body() data: CreateUserDTO): Promise<UsersEntity> {
    return this.usersService.create(data);
  }

  @ApiOperation({ summary: 'Обновляет запрашиваемого пользователя' })
  @ApiOkResponse({ description: 'Обновленный пользователь' })
  @ApiNotFoundResponse({ description: 'Запрашиваемый пользователь не найден' })
  @Put(':id')
  private update(
    @Param('id') id: number,
    @Body() data: UpdateUserDTO,
  ): Promise<UsersEntity> {
    return this.usersService.update(id, data);
  }

  @ApiOperation({ summary: 'Удаляет запрашиваемого пользователя' })
  @ApiOkResponse({ description: 'Удаленный пользователь' })
  @ApiNotFoundResponse({ description: 'Запрашиваемый пользователь не найден' })
  @Delete(':id')
  private destroy(@Param('id') id: number): Promise<UsersEntity> {
    return this.usersService.destroy(id);
  }

  @Get('/getRoleByTitle/:userId/:roleName')
  private async getRole(
    @Param('userId') userId: number,
    @Param('roleName') roleName: string | number,
  ) {
    return this.usersService.getRoleByTitle(userId, roleName);
  }

  @Get('/removeRoleByTitle/:userId/:roleName')
  private async removeRole(
    @Param('userId') userId: number,
    @Param('roleName') roleName: string | number,
  ) {
    return this.usersService.removeRoleByTitle(userId, roleName);
  }

  @Put('setProfilePicture/:id')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads/profilePictures',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  private async setProfilePicture(
    @Param('id') id: number,
    @UploadedFile() file,
    @Body() bio,
  ) {
    return this.usersService.setProfilePicture(id, file, bio);
  }

  @Get('getPhotoByEmail/:email')
  private async getPhotoByEmail(@Param('email') email: string, @Res() res) {
    return this.usersService.getPhotoByEmail(email, res);
  }

  @ApiOperation({ summary: 'Возвращает ФИО запрашиваемого пользователя' })
  @ApiOkResponse({ description: 'Запрашиваемый пользователь' })
  @ApiNotFoundResponse({
    description: 'Запрашиваемый пользователь с такой почтой не найден',
  })
  @Get('getNameByEmail/:email')
  private async getNameByEmail(@Param('email') email: string): Promise<string> {
    return this.usersService.getNameByEmail(email);
  }
}
