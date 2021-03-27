import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TodoEntity } from 'src/db/entities/TodoEntity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTodosByUserId(@Request() req: any): Promise<TodoEntity[]> {
    const todos = await this.todosService.getAllTodosByUserId(req.user.id);
    return todos;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addNewTodo(
    @Request() req: any,
    @Body() todoData: Partial<TodoEntity>,
  ): Promise<TodoEntity> {
    todoData.userId = req.user.id;
    const newTodo = await this.todosService.addNewTodo(todoData);
    return newTodo;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) todoId: number,
    @Body() todoData: Partial<TodoEntity>,
  ): Promise<TodoEntity> {
    todoData.id = todoId;
    const updatedTodo = await this.todosService.updateTodo(todoData);
    return updatedTodo;
  }
}
