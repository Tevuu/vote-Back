import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../config/files.utils';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Файлы')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    return this.filesService.uploadedFile(file);
  }

  @Post('uploadMultipleFiles')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    return this.filesService.uploadMultipleFiles(files);
  }

  @Get('/getNewsPicture/:imagename')
  getNewsImage(@Param('imagename') image, @Res() res) {
    return this.filesService.getNewsImage(image, res);
  }

  @Get('/getProfilePicture/:imagename')
  getProfileImage(@Param('imagename') image, @Res() res) {
    return this.filesService.getProfileImage(image, res);
  }
}
