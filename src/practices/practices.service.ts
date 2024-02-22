import { Injectable } from '@nestjs/common';
import { CreatePracticeDto, EOprator } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { Practices } from './schema/practices.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PracticesService {
  constructor(
    @InjectModel(Practices.name) private model: Model<Practices>
  ) {

  }
  
  async getNewQueston(ip: string) {
    const query = {
      ips: { $nin: [ip] }
    }
    const founded = await this.model.findOne(query, {}, { lean: true })
    if (founded) {
      await this.model.findByIdAndUpdate(founded._id, { $push: { ips: ip } })
    }
    return founded
  }
  async create(createPracticeDto: CreatePracticeDto, ip: string) {

    const newQuestion = await this.getNewQueston(ip)
    if (newQuestion) {
      return newQuestion
    }
    console.log("createPracticeDto", createPracticeDto);

    var prompt = `write a level ${createPracticeDto.level} numeric ${createPracticeDto.oprator} question like 1. (Sr) and  1 (first number) ${createPracticeDto.oprator==EOprator.ADDTION?"+":createPracticeDto.oprator==EOprator.DIVISION?"÷":createPracticeDto.oprator==EOprator.MULTIPLICATION?"×":createPracticeDto.oprator==EOprator.SUBSTRACTION?"-":""} 2 (second number) = 3 (answer) same as for all 20 question`

    console.log("prompt", prompt);

    const items = {
      oprator: createPracticeDto.oprator,
      level: createPracticeDto.level,
      ips: [ip]
    }
    //
    return await this.model.create(items)
  }

  findAll() {
    return `This action returns all practices`;
  }

  async findOne(id: string) {
    return await this.model.findById(id)
  }

  update(id: number, updatePracticeDto: UpdatePracticeDto) {
    return `This action updates a #${id} practice`;
  }

  remove(id: number) {
    return `This action removes a #${id} practice`;
  }
}
