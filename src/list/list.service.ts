import { BadRequestException, Injectable } from '@nestjs/common';
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

  findAll(): Promise<{id:number,name:string}[]>{
    return this.listRepositry.find({select:['id','name']});
  }

  findOne(id: number): Promise<{id:number,name:string}> {
    return this.listRepositry.findOneBy({id: id}).then((list) =>{
      return({
        id: list.id,
        name:list.name,
      })
    }).catch(error => {
      throw new BadRequestException("there is no list with this id")
    });
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await this.listRepositry.findOneBy({id: id});
    if(!list) {
      throw new BadRequestException("there is no list with this id");
    } else {
      list.name = updateListDto.name;
      await this.listRepositry.save(list);
      return "list updated successfuly";
    }
  }

  async remove(id: number): Promise<void>{
    await this.listRepositry.delete(id);
  }
}
