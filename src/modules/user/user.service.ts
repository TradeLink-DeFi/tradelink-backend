import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/databases/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(where: Partial<User>): Promise<UserDocument> {
    return this.userModel.findOne({ ...where }).exec();
  }

  create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }
}
