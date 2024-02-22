import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAdvertisementsDto, EOprator } from './dto/create-advertisements.dto';
import { UpdateAdvertisementsDto } from './dto/update-advertisements.dto';
import { Advertisements } from './schema/advertisements.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ethers } from 'ethers';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectModel(Advertisements.name) private model: Model<Advertisements>
  ) {

  }

  async create(createPracticeDto: CreateAdvertisementsDto, ip: string) {
    console.log("createPracticeDto",createPracticeDto);
    
    let decodedWalletAddress = ethers.verifyMessage(createPracticeDto.message, createPracticeDto.signature)
    console.log("decodedWalletAddress",decodedWalletAddress);
    
    if (decodedWalletAddress.toLowerCase() == createPracticeDto.wallet_address.toLowerCase()) {

      return await this.model.create({
        wallet_address: createPracticeDto.wallet_address,
        image: createPracticeDto.message,
        pixels: createPracticeDto.pixels,
        ip,
      })

    }
    throw new UnauthorizedException({
      ...createPracticeDto,
      decoded_wallet_address: decodedWalletAddress,
    })


  }

  findAll() {
    return `This action returns all practices`;
  }

  async findOne(id: string) {
    return await this.model.findById(id)
  }

  update(id: number, updatePracticeDto: UpdateAdvertisementsDto) {
    return `This action updates a #${id} practice`;
  }

  remove(id: number) {
    return `This action removes a #${id} practice`;
  }
}
