import { HttpException, Injectable } from '@nestjs/common';
import { CreateAgorachatDto } from './dto/create-agorachat.dto';
import { UpdateAgorachatDto } from './dto/update-agorachat.dto';
import { ChatTokenBuilder } from 'agora-token';

const appId = process.env.AGORA_APP_ID
const appCertificate = process.env.APP_CERTIFICATE

@Injectable()
export class AgorachatService {
  create(createAgorachatDto: CreateAgorachatDto) {
    const { uuid } = createAgorachatDto
    const expirationInSeconds = 600;
    const userToken = ChatTokenBuilder.buildUserToken(appId, appCertificate, uuid, expirationInSeconds);
    console.log("Chat User Token:", userToken);

    const appToken = ChatTokenBuilder.buildAppToken(appId, appCertificate, expirationInSeconds);
    console.log("Chat App Token:", appToken);
    return {
      userToken,
      appToken
    };
  }

  findAll() {
    return `This action returns all agorachat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agorachat`;
  }

  update(id: number, updateAgorachatDto: UpdateAgorachatDto) {
    return `This action updates a #${id} agorachat`;
  }

  remove(id: number) {
    return `This action removes a #${id} agorachat`;
  }
}
