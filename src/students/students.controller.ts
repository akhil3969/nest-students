import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    console.log('StudentsController');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.studentService.findAll(paginationQueryDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log(id); // test before adding the pipe
    return this.studentService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateStudentDto) {
    console.log(typeof body);
    console.log(body instanceof CreateStudentDto);
    return this.studentService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateStudentDto) {
    return this.studentService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
