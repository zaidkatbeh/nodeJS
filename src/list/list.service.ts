import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepositry: Repository<List>
    ){}
  async create(createListDto: CreateListDto): Promise<List>{
    const newList = this.listRepositry.create({
      name: createListDto.name,
    });
    return this.listRepositry.save(newList)
  }

  findAll(): Promise<List[]>{
    return this.listRepositry.find();
  }

  findOne(id: number): Promise<List> {
    return this.listRepositry.findOneBy({id: id});
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  async remove(id: number): Promise<void>{
    await this.listRepositry.delete(id);
  }
}
