import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadImage } from './dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post('file')
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UploadImage })
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File){
        return this.uploadService.upload(file)
    }
}
