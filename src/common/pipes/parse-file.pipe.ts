import {
  Injectable,
  PipeTransform,
  BadRequestException,
  UnsupportedMediaTypeException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class FileTransform implements PipeTransform {
  // Custom Pipe for Optional Validation of Uploaded Files
  required = false;
  fileTypes: Array<string>;
  maxFileSize: number;

  checkFileExceedsMaximumLimited(file: Express.Multer.File) {
    const inputFileSize: number = file.size / 1024 / 1024;
    return inputFileSize > this.maxFileSize;
  }

  constructor(
    isRequired: boolean,
    maxFileSize: number,
    fileTypes: Array<string>,
  ) {
    this.required = isRequired;
    this.fileTypes = fileTypes;
    this.maxFileSize = maxFileSize;
  }

  transform(
    files: Express.Multer.File | Express.Multer.File[],
    // metadata: ArgumentMetadata,
  ): Express.Multer.File | Express.Multer.File[] {
    if (files === undefined || files === null) {
      throw new BadRequestException('Validation failed (file expected)');
    }

    if (this.required) {
      //If files are required, this block will return exception if no files found
      if (Array.isArray(files) && files.length == 0)
        throw new BadRequestException('Validation failed (Need JPEG Files)');
    }

    if (Array.isArray(files) && files.length > 0) {
      // Looping through File Array to check each file for the condition specified
      files.forEach((file) => {
        if (!this.fileTypes.some((m) => file.mimetype.includes(m))) {
          throw new UnsupportedMediaTypeException(
            `File type is not matching: ${this.fileTypes.join(', ')}`,
          );
        }
        if (this.checkFileExceedsMaximumLimited(file))
          throw new HttpException(
            `fileSize should be less than ${this.maxFileSize}`,
            HttpStatus.PAYLOAD_TOO_LARGE,
          );
      });
    }

    return files;
  }
}
