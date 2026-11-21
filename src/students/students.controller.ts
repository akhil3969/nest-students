import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ForbiddenExceptionFilter } from '../filters/forbidden-exception.filter';
import { StudentGuard } from '../guards/student.guard';
import { UppercasePipe } from '../pipes/uppercase.pipe';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiForbiddenResponse } from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    console.log('StudentsController');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.studentService.findAll(paginationQueryDto);
  }

<<<<<<< HEAD
  @Get('forbidden')
  @UseFilters(ForbiddenExceptionFilter)
  getForbidden() {
    throw new ForbiddenException();
  }

  @Get('protected')
  @UseGuards(StudentGuard)
  getProtected() {
    return { message: 'Welcome, student!' };
  }

  @Get('name/:name')
  getName(@Param('name', UppercasePipe) name: string) {
    return { name };
  }

=======
  @Public()
>>>>>>> c0a051b2806a8501bf053417b0b6a360deed0c7a
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
