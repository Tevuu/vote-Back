import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  constructor() {}

  public async uploadedFile(file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }

  async uploadMultipleFiles(files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }

  public async getImage(image, res) {
    const response = res.sendFile(image, { root: './uploads/newsPictures' });
    return {
      status: HttpStatus.OK,
      data: { response },
    };
  }
}
