import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { hashPassword } from 'src/shared/helper/hashing.helper.service';
import { SignUpDTO } from 'src/auth/dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Finding user with email
   * @param email User Email
   * @returns User Model
   */
  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return await this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  /**
   * Creating a new user
   * @param createUserDto User DTO
   * @returns created user
   */
  async create(createUserDto: SignUpDTO): Promise<UserDocument> {
    const isUserExists = await this.findByEmail(createUserDto.email);
    if (isUserExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hashPassword(createUserDto.password);
    const newUser = new this.userModel({ ...createUserDto, hashedPassword });
    return await newUser.save();
  }

  /**
   * Finding a user by Id
   * @param id User Id
   * @returns User info
   */
  async findById(id: ObjectId): Promise<UserDocument | undefined> {
    return await this.userModel.findById(id).exec();
  }
}
